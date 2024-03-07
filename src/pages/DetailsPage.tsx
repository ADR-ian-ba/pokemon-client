import { Card, CardContent, Typography, Box } from '@mui/material';
import { decompressFromEncodedURIComponent } from 'lz-string';
import React from 'react';

const DetailsPage = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    const height = params.get('height');
    const weight = params.get('weight');

    // Assuming decompressFromEncodedURIComponent is needed; otherwise, directly use params.get('...').
    const move = decompressFromEncodedURIComponent(params.get('move'));
    const official = decompressFromEncodedURIComponent(params.get('official'));
    const sprite = decompressFromEncodedURIComponent(params.get('sprite'));

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
                  <img src={official} alt="" style={{objectFit:"cover", width:"100%"}} />
                </Card>
                <Card variant='outlined'>
                  <img src={sprite} alt="" style={{objectFit:"cover", width:"100%"}}/>
                </Card>
              </CardContent>

              <CardContent>
                <Card variant='outlined' sx={{
                  height:"100%",
                  padding: "1rem",
                }}>
                  <p>PokedexId : {id}</p>
                  <p>PokedexId : {id}</p>
                  <p>PokedexId : {id}</p>

                  <p>Move :</p>
                </Card>
              </CardContent>
            </div>



            </Card>
        </div>
    );
};

export default DetailsPage;
