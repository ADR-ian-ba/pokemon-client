import { Card, CardContent, Typography,} from '@mui/material';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { Footer } from '../components';

const DetailsPage = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    const height = params.get('height');
    const weight = params.get('weight');

    // Assuming decompressFromEncodedURIComponent is needed; otherwise, directly use params.get('...').
    const moveDecompressed = decompressFromEncodedURIComponent(params.get('move'));
    const official = decompressFromEncodedURIComponent(params.get('official'));
    const sprite = decompressFromEncodedURIComponent(params.get('sprite'));

    const move = JSON.parse(moveDecompressed)
    return (
        <div>

            <Card variant='outlined' sx={{
              padding:"1rem"
            }}>
            <Typography variant="h4">
            {name} Details
            </Typography>

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
                  <img src={official} alt="" style={{objectFit:"contain", width:"100%", maxHeight: "200px", maxWidth:"200px"}} />
                </Card>

                <Card variant='outlined'>
                  <img src={sprite} alt="" style={{objectFit:"contain", width:"100%", maxHeight: "200px", maxWidth:"200px"}}/>
                </Card>
              </CardContent>

              <CardContent>
                <Card variant='outlined' sx={{
                  height:"100%",
                  padding: "1rem",
                }}>
                  <Typography variant="h5" className="p-details">PokedexId : {id}</Typography>
                  <Typography variant="h5" className="p-details">Height : {height}</Typography>
                  <Typography variant="h5" className="p-details">Weight : {weight}</Typography>

                  <Typography variant="h5" className="p-details">Move : </Typography>

                  <div className="move-wrapper">

                  {move.map((each, index) => (
                    <Card 
                      key={index}
                      sx={{
                        marginBottom: "1rem",
                        height: "2rem",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                      }}
                      variant="outlined"
                    >
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
              <Footer/>
        </div>
    );
};

export default DetailsPage;

