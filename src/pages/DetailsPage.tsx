import { Card, CardContent, Typography,} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IPokemonDetail from '../interfaces/IPokemonDetail';

const DetailsPage = () => {
    const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetail | null>(null);    
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    useEffect(()=>{
      const fetchData = async ()=> {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const moves = res.data.moves.map((each:any)=>({
          name: each.move.name
        }))

        const pokemonDetails: IPokemonDetail = {
          name: res.data.name,
          height: res.data.height,
          weight: res.data.weight,
          official: res.data.sprites.other['official-artwork'].front_default,
          sprite: res.data.sprites.front_default,
          move: moves, 
        }
        console.log(res)
        setPokemonDetails(pokemonDetails)
      }

      fetchData()
    })

    if (!pokemonDetails) {
      return <Typography>Loading...</Typography>;
    }

    return (
        <div className='details-page'>

            <Card variant='outlined' sx={{
              margin: "1rem auto",
              padding: "1rem",
              maxWidth: "70%",
            }}>

            <Typography variant="h4">{pokemonDetails.name} Details</Typography>

            <div className="wrapper" style={{
              display:"grid",
              gridGap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
            }}>

              <CardContent>
                <Card variant='outlined'
                  sx={{
                    marginBottom: "1rem"
                  }}>
                  <img src={pokemonDetails.official} alt="" style={{objectFit:"contain", width:"100%", maxHeight: "200px", maxWidth:"200px"}} />
                </Card>

                <Card variant='outlined'>
                  {/* <img src={sprite} alt="" style={{objectFit:"contain", width:"100%", maxHeight: "200px", maxWidth:"200px"}}/> */}
                </Card>
              </CardContent>

              <CardContent>
                <Card variant='outlined' sx={{
                  height:"100%",
                  padding: "1rem",
                }}>

                  <Typography variant="h5" className="p-details">PokedexId : {id}</Typography>
                  <Typography variant="h5" className="p-details">Height : {pokemonDetails.height}</Typography>
                  <Typography variant="h5" className="p-details">Weight : {pokemonDetails.weight}</Typography>
                  <Typography variant="h5" className="p-details">Move : </Typography>

                  <div className="move-wrapper">
                  {pokemonDetails.move.map((each:any, index:any) => (
                    <Card 
                      key={index}
                      sx={{
                        marginBottom: "1rem",
                        height: "2rem",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                      }}
                      variant="outlined">

                      <Typography variant="body2" component="div">
                        {each.name}
                      </Typography>

                    </Card>
                  ))}

                  </div>
                </Card>
                
              </CardContent>
            </div>





            </Card>
              {/* <button onClick={()=> console.log(move[0].name)}>tets</button> */}
              <Link to='/' style={{paddingBottom: "5rem"}}>Back</Link>
        </div>
    );
};

export default DetailsPage;

