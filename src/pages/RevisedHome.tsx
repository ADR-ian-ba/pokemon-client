import { useEffect, useState } from 'react';
import { Card, CardMedia, Typography } from '@mui/material';
import { fetchData } from '../functions/utils';
import { Footer } from '../components';
import { compressToEncodedURIComponent } from 'lz-string';


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
  move: Move[];
}

const RevisedHome = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //initial data seeding
  useEffect(() => {
    const getPokemon = async () => {
      if (pokemonList.length === 0 && !isLoading) {
        setIsLoading(true);
        const res = await fetchData(pokemonList.length + 1);
        setPokemonList((prevList) => [...prevList, ...res]);
        setIsLoading(false);
      }
    };

    getPokemon();
    getPokemon();
  }, [pokemonList.length, isLoading]);

  
  //infinite scrolling
  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      )
        return;

      setIsLoading(true); 
      const res = await fetchData(pokemonList.length + 1);
      setPokemonList((prevList) => [...prevList, ...res]);
      setIsLoading(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, pokemonList.length]);

  const redirect = (each:Pokemon)=>{
    const dataString = JSON.stringify(each.move);
    const compressMove = compressToEncodedURIComponent(dataString)
    const compressOfficial = compressToEncodedURIComponent(each.official)
    const compressSprite = compressToEncodedURIComponent(each.sprite)
    window.location.href = `http://localhost:5173/details?id=${each.id}&name=${each.name}&height=${each.height}&weight=${each.weight}&official=${compressOfficial}&sprite=${compressSprite}&move=${compressMove}`
  }

  return (
    <div className="home-page">
      <Typography
        sx={{ margin: '0 auto', marginBottom: '1rem', width: 'fit-content' }}
        variant="h4"
      >
        List Pokemon
      </Typography>

      <div
        className="cards-wrapper"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          margin: '0 auto',
          width: '100vw',
          padding: '2rem',
          paddingBottom:'10rem'
        }}
      >
        {pokemonList.map((each, index) => (
          <div
            key={index}
            className="card-wrapper"
            style={{
              maxWidth: '15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5rem',
            }}
          >
            <Card variant="outlined">
              <CardMedia
                component="img"
                height="10%"
                image={each.official}
              />
            </Card>
            <Card
              onClick={() => redirect(each)}
              variant="outlined"
              sx={{
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                placeContent: 'center',
                cursor: 'pointer',
              }}
            >
              {each.name}
            </Card>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default RevisedHome;
