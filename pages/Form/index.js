import {useState,useEffect,React} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.notion.so/b7920e6177574b6e85d7a23ce52b1a65?v=a4140825a4fb4a9d9d60f8b152281c31">
        トレーニング記録
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

const [nameSelectList, setNameSelectList] = useState()
const [siteSelectList, setSiteSelectList] = useState()

const [aleart, setAleart] = useState(false)

const bodyInit = {
    name:"",
    site:"",
    Weight:"",
    Set:"",
    Rep:"",
  }
  const [isvalue, setIsValue] = useState(bodyInit)
  const handleFieldCange = (id,event) => {
      console.log(handleFieldCange)

  };
  const handleSubmit = (event) => {
    setAleart(true)
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    console.log(event.currentTarget)
    const body = {
        name:dataForm.get('name'),
        site:dataForm.get('site'),
        Weight:dataForm.get('Weight'),
        Set:dataForm.get('Set'),
        Rep:dataForm.get('Rep'),
      }
    const dataBody = JSON.stringify(body)
    const fetchUsers = async () => {
    setIsValue(bodyInit)
      const response = await fetch('/api/notion-post-api',{method: 'POST', body:dataBody})
      const data = await response.json()

    }
    fetchUsers()
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/notion-get-api')
      const data = await response.json()
      setNameSelectList(data.properties.Name.select.options)
      setSiteSelectList(data.properties.部位.select.options)
    }
    fetchUsers()
  },[])

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await fetch('/api/notion-post-api')
//       const data = await response.json()
//       console.log(data)
//     }
//     fetchUsers()
//   },[])
  console.log(isvalue.name)
  const aleartDisplay = ( <Alert severity="success" color="info">
  今日も頑張っていこうー！
</Alert>)
  return (
    <ThemeProvider theme={theme}>
        {aleartDisplay}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          💪
          </Avatar>
          <Typography component="h1" variant="h5">
            トレーニング記録やで
          </Typography>
          <Box component="form" id="notionform" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={nameSelectList}
                getOptionLabel={(option) => option.name}
                // value={isvalue.name}
                // onChange={(e) => {
                //     console.log(e)
                //     const val = nameSelectList.filter((item => item.name === e.target.innerHTML))
                //     console.log(val)
                //   setIsValue(preSetting =>({
                //       ...preSetting,
                //       name:val[0]
                //   }))
                // }}
                renderInput={(params) => <TextField
                    fullWidth 
                    name="name" 
                    {...params} 
                    label="メニュー"/>}
                />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                disablePortal
                
                id="combo-box-demo"
                options={siteSelectList}
                getOptionLabel={(option) => option.name}
                // value={value.site}
                // onChange={(e) => {
                //   setIsValue(preSetting =>({
                //       ...preSetting,
                //       site:String(e.target.value)
                //   }))
                // }}
                renderInput={(params) => <TextField
                    fullWidth 
                    name="site"
                    {...params} 
                    label="部位"/>}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Weight"
                  label="Weight"
                  type="number"
                  id="weight"
                  autoComplete="weight"
                  value={isvalue.Weight}
                  onChange={(e) => {
                    setIsValue(preSetting =>({
                        ...preSetting,
                        Weight:String(e.target.value)
                    }))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 fullWidth
                  name="Set"
                  label="Set"
                  type="number"
                  id="set"
                  autoComplete="set"
                  value={isvalue.Set}
                  onChange={(e) => {
                    setIsValue(preSetting =>({
                        ...preSetting,
                        Set:String(e.target.value)
                    }))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                  name="Rep"
                  label="Rep"
                  type="number"
                  id="rep"
                  autoComplete="rep"
                  value={isvalue.Rep}
                  onChange={(e) => {
                    setIsValue(preSetting =>({
                        ...preSetting,
                        Rep:String(e.target.value)
                    }))
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Snackbar
        open={aleart}
        autoHideDuration={3000}
        message="おつかれい！"
      />
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

