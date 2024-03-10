//not used

import { useEffect, useState, useRef } from 'react';
import { fetchData } from '../functions/utils';
import { Typography } from '@mui/material';
import { Footer, MyCard } from '../components';


interface Move {
  name: string; 
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  official: string;
  sprite: string;
  move: Move[]
}

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [translateX, setTranslateX] = useState(0)
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const getMaxTranslateX = () => {
    if (wrapperRef.current) {
      const { scrollWidth, offsetWidth } = wrapperRef.current
      return Math.min(0, offsetWidth - scrollWidth)
    }
    return 0
  };

  const handleDragStart = (e:unknown) => {
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    setStartX(clientX)
    setIsDragging(true)
  };


  const handleDragMove = (e:unknown) => {
    if (!isDragging) return
    e.preventDefault()
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    const moveX = clientX - startX

    setTranslateX(currentTranslateX  => {
      const maxTranslateX = getMaxTranslateX()
      const newTranslateX = currentTranslateX + moveX
      return Math.min(0, Math.max(newTranslateX, maxTranslateX))
    })

    setStartX(clientX);
  }


  const handleDragEnd = async () => {
    setIsDragging(false);
  }
  useEffect(() => {
    const currentId = pokemonList.length + 1

    const getPokemon = async () => {
      if (pokemonList.length === 0) {
        const res = await fetchData(currentId)
        setPokemonList((prevList:unknown) => [...prevList, ...res])
      }
    }

    getPokemon();
  }, [pokemonList.length])


  const handleLeftClick = () => {
    if (translateX < 0) {
      setTranslateX(currentTranslateX => Math.min(currentTranslateX + 400, 0))
    }
  }

  const handleRightClick = async () => {
    if (wrapperRef.current) {
      const { scrollWidth, offsetWidth } = wrapperRef.current;
      const isCloseToEnd = Math.abs(translateX) + offsetWidth > scrollWidth - 400

      if (isCloseToEnd) {
        await fetchData(pokemonList.length + 1).then(newPokemon => {
          setPokemonList(prevList => [...prevList, ...newPokemon])
        })
      }

      if (!isCloseToEnd || (isCloseToEnd && pokemonList.length % 20 === 0)) {
        setTranslateX(currentTranslateX => currentTranslateX - 400)
      }
    }
  }

  return (
    <div>
      <Typography sx={{ marginBottom: '1rem' }} variant="h4">
        List Pokemon
      </Typography>
      <div 
      className="slider"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd} 
      onTouchEnd={handleDragEnd}>
        <div
          className="card-wrapper"
          ref={wrapperRef}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {pokemonList.map((each, index) => (
            <MyCard move={each.move} key={index} sprite={each.sprite} id={each.id} height={each.height} weight={each.weight} name={each.name} official={each.official} />
          ))}
        </div>

        <div>
          <svg
            onClick={handleLeftClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="chevron"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <svg
            onClick={handleRightClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="chevron"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      {/* <button onClick={()=> console.log(pokemonList)}>test</button> */}
      <Footer/>
    </div>
  );
};

export default HomePage;
