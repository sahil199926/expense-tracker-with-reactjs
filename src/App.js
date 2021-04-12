import React from 'react'
import Details from './compononts/details/Details'
import {Grid} from '@material-ui/core';
import Main from './compononts/main/Main';
import { connect } from 'react-redux';
import useStyles from './appStyle';
import {PushToTalkButton,PushToTalkButtonContainer,ErrorPanel} from '@speechly/react-ui';
function App(prop) {
    const classes=useStyles();
    return (
        <div>
            <Grid className={classes.grid} container spaceing={0} alignItems='center' justify='center' style={{height:"100vh"}}>
            <Grid item xs={12} sm={4} className={classes.mobile}>
                     <Details title='Income' transactions={prop.t}  />
                 </Grid>
                 <Grid item xs={12} sm={3}className={classes.main} >
                    <Main />
                 </Grid>
                 <Grid item xs={12} sm={4} className={classes.desktop}>
                     <Details title='Income' transactions={prop.t}  />
                 </Grid>
                 <Grid item xs={12} sm={4} className={classes.last} >
                     <Details title='Expense' transactions={prop.t}  />
                 </Grid>
                  
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton/>
                <ErrorPanel/>
            </PushToTalkButtonContainer>
          
        </div>
    );
}

const mapStateoprops = (state) => {

    return { t: state }
}

export default connect(mapStateoprops)(App);

