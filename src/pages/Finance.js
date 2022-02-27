import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { useState,useEffect} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { db, set, ref, onChildAdded, auth, onAuthStateChanged ,remove,orderByChild,onValue} from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import UpdateIcon from '@mui/icons-material/Update';
import Navbar from "../comp2/navbar";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



import SearchIcon from '@mui/icons-material/Search';
import { Select } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function Finance() {
  const [CattleID, setCattleID] = useState("");

  const [CattleName, setCattleName] = useState("");
  const [PurchaseCost, setPurchaseCost] = useState("");
  const [CattleExpense, setCattleExpense] = useState("");
  const [SaleCost, setSaleCost] = useState("");
  const [Margin, setMargin] = useState("");
  const [Expense, setExpense] = useState("");
  const [Cost, setCost] = useState("");
  const [date, setdate] = useState("");
  const [ExpenseName, setExpenseName] = useState("");
  const [ExpenseCost, setExpenseCost] = useState("");
  const [ExpenseDate, setExpenseDate] = useState("");
  const [search, setSearch] = useState("");

  const [userList, setUserList] = useState([]);
  const [userList2, setUserList2] = useState([]);
  const [userList3, setUserList3] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  console.log("state",);


  var [updatebutton, setupdatebutton] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const add = () => {
    let obj = {
      CattleID,
      CattleName,
      PurchaseCost,
      CattleExpense,
      SaleCost,
      Margin,
      key: updatebutton ? updatebutton : uuidv4(),
    };
    const refrence = ref(
      db,
      `/finance/CattleExpense/${updatebutton ? updatebutton : obj.key}`
    );

    set(refrence, obj)
      .then(() => {
       
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleClose();
    setupdatebutton();

    setCattleID("");
    setCattleName("");
    setPurchaseCost("");
    setCattleExpense("");
    setSaleCost("");
    setMargin("");
  };
  useEffect(() => {
      let refrence = ref(db, `finance/CattleExpense`);
      let arr = [];
      onValue(refrence, (snapshot) => {  
        if(snapshot.val()){   
        let arr=Object.values(snapshot.val()).map((value)=>value);
        console.log('DATA VAL', arr)
        setUserList(arr);
        }
    });

  }, []);
  const deleteUser = (key) => {
    const refrence = ref(db, "finance/CattleExpense" + key);
    remove(refrence);
  };
  let upDate = (data) => {
    setupdatebutton(data.key);

    setCattleID(data.CattleID);
    setCattleName(data.CattleName);
    setPurchaseCost(data.PurchaseCost);
    setCattleExpense(data.CattleExpense);
    setSaleCost(data.SaleCost);
    setMargin(data.Margin);
    handleOpen();
  };
 
  const add1 = () => {
    let obj = {
      CattleID,
      CattleName,
      ExpenseName,
      ExpenseCost,
      ExpenseDate,
      key: updatebutton ? updatebutton : uuidv4(),
    };
    const refrence = ref(
      db,
      `/finance/Expenses/${updatebutton ? updatebutton : obj.key}`
    );

    set(refrence, obj)
      .then(() => {
       
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleClose();
    setupdatebutton();

    CattleID("");
    CattleName("");
    setExpenseCost("");
    setExpenseName("");
    setExpenseDate("");
  };
  useEffect(() => {
      let refrence = ref(db, `finance/Expenses`);
      let arr = [];
      onValue(refrence, (snapshot) => {     
        if(snapshot.val()){   
          let arr=Object.values(snapshot.val()).map((value)=>value);
          console.log('DATA VAL', arr)
          setUserList2(arr);
          }
    });

  }, []);
  const deleteUser1 = (key) => {
    const refrence = ref(db, "finance/Expenses" + key);
    remove(refrence);
  };
  let upDate1 = (data1) => {
    setupdatebutton(data1.key);
    setCattleID(data1.CattleID);
    setCattleName(data1.CattleName);
    setExpenseCost(data1.ExpenseCost);
    setExpenseDate(data1.ExpenseDate);
    setExpenseName(data1.ExpenseName)
    handleOpen();
  };
  const add2 = () => {
    let obj = {
      CattleID,
      Expense,
      Cost,
      date,
      key: updatebutton ? updatebutton : uuidv4(),
    };
    const refrence = ref(
      db,
      `/finance/Overall/${updatebutton ? updatebutton : obj.key}`
    );

    set(refrence, obj)
      .then(() => {
       
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleClose();
    setupdatebutton();

    CattleID("");
    Expense("");
    Cost("");
    date("");
    
  };
  useEffect(() => {
      let refrence = ref(db, `finance/Overall`);
      let arr = [];
      onValue(refrence, (snapshot) => {     
        if(snapshot.val()){   
          let arr=Object.values(snapshot.val()).map((value)=>value);
          console.log('DATA VAL', arr)
          setUserList3(arr);
          }
    });

  }, []);
  const deleteUser3 = (key) => {
    const refrence = ref(db, "finance/Overall" + key);
    remove(refrence);
  };
  let upDate3 = (data3) => {
    setupdatebutton(data3.key);

    setCattleID(data3.CattleID);
    setCattleName(data3.Expense);
    setCattleName(data3.Cost);
    setCattleName(data3.date);

   
    handleOpen();
  };
  const classes = useStyles();
  const theme = useTheme();
console.log('value', value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const Popup1 = () => (
    <Modal
    open={open}
    onClose={() => {
      handleClose();
      setupdatebutton();
    }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Enter New Stock
      </Typography>
      <TextField
        sx={{ mt: 4 }}
        id="outlined-basic"
        label="CattleID"
        variant="outlined"
        value={CattleID}
        onChange={(e) => setCattleID(e.target.value)}
      />

      <TextField
        sx={{ mt: 4 }}
        id="outlined-basic"
        label="CattleName"
        variant="outlined"
        value={CattleName}
        onChange={(e) => setCattleName(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-basic"
        label="PurchaseCost"
        variant="outlined"
        value={PurchaseCost}
        onChange={(e) => setPurchaseCost(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-basic"
        label="CattleExpense"
        variant="outlined"
        value={CattleExpense}
        onChange={(e) => setCattleExpense(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-basic"
        label="SaleCost"
        variant="outlined"
        value={SaleCost}
        onChange={(e) => setSaleCost(e.target.value)}
      />
       <TextField
        sx={{ mt: 2 }}
        id="outlined-basic"
        label="Margin"
        variant="outlined"
        value={Margin}
        onChange={(e) => setMargin(e.target.value)}
      />
      <br />
      <Button
        onClick={add}
        sx={{
          mt: 2,
        }}
        variant="contained"
      >
        {updatebutton ? "Update" : <AddCircleOutlineIcon />}
      </Button>
    </Box>
  </Modal>
  )
  
  const Popup3 = () => (
    <Modal
    open={open}
    onClose={() => {
      handleClose();
      setupdatebutton();
    }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Enter Here
      </Typography>
      <TextField
        sx={{ mt: 4 }}
        id="outlined-basic"
        label="CattleID"
          variant="outlined"
        value={CattleID}
        onChange={(e) => setCattleID(e.target.value)}
      />

      <TextField
        sx={{ mt: 4 }}
        id="outlined-basic"
        label="Expense"
        variant="outlined"
        value={Expense}
        onChange={(e) => setExpense(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-basic"
        label="Cost"
        variant="outlined"
        value={Cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <TextField
        sx={{ mt: 2 }}
        id="outlined-basic"
        label="Date"
        variant="outlined"
        value={date}
        onChange={(e) => setdate(e.target.value)}
      />
     
      <br />
      <Button
        onClick={add}
        sx={{
          mt: 2,
        }}
        variant="contained"
      >
        {updatebutton ? "Update" : <AddCircleOutlineIcon />}
      </Button>
    </Box>
  </Modal>
  )
  console.log('LIST', userList)
  return (
    <>
    <Navbar/>
    <div className='home'>
     <center><h1 style={{color:"white"}}>FINANCE</h1></center>
     <center>
        <Button style={{ color: "white" }} onClick={handleOpen}>
          ADD finance
          <AddCircleOutlineIcon />
        </Button>

        {
          value == 0
          ?
          <Modal
          open={open}
          onClose={() => {
            handleClose();
            setupdatebutton();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter New Stock
            </Typography>
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleID"
              variant="outlined"
              value={CattleID}
              onChange={(e) => setCattleID(e.target.value)}
            />
      
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleName"
              variant="outlined"
              value={CattleName}
              onChange={(e) => setCattleName(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="PurchaseCost"
              variant="outlined"
              value={PurchaseCost}
              onChange={(e) => setPurchaseCost(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="CattleExpense"
              variant="outlined"
              value={CattleExpense}
              onChange={(e) => setCattleExpense(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="SaleCost"
              variant="outlined"
              value={SaleCost}
              onChange={(e) => setSaleCost(e.target.value)}
            />
             <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="Margin"
              variant="outlined"
              value={Margin}
              onChange={(e) => setMargin(e.target.value)}
            />
            <br />
            <Button
              onClick={add}
              sx={{
                mt: 2,
              }}
              variant="contained"
            >
              {updatebutton ? "Update" : <AddCircleOutlineIcon />}
            </Button>
          </Box>
        </Modal>
          :
          value == 1
          ?
          <Modal
          open={open}
          onClose={() => {
            handleClose();
            setupdatebutton();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter New Stock
            </Typography>
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleID"
                variant="outlined"
              value={CattleID}
              onChange={(e) => setCattleID(e.target.value)}
            />
             <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleName"
                variant="outlined"
              value={CattleName}
              onChange={(e) => setCattleName(e.target.value)}
            />
      
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="ExpenseName"
              variant="outlined"
              value={ExpenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="ExpenseCost"
              variant="outlined"
              value={ExpenseCost}
              onChange={(e) => setExpenseCost(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="ExpenseDate"
              variant="outlined"
              value={ExpenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
           
            <br />
            <Button
              onClick={add1}
              sx={{
                mt: 2,
              }}
              variant="contained"
            >
              {updatebutton ? "Update" : <AddCircleOutlineIcon />}
            </Button>
          </Box>
        </Modal>
          :
          <Modal
          open={open}
          onClose={() => {
            handleClose();
            setupdatebutton();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Here
            </Typography>
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleID"
                variant="outlined"
              value={CattleID}
              onChange={(e) => setCattleID(e.target.value)}
            />
      
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="Expense"
              variant="outlined"
              value={Expense}
              onChange={(e) => setExpense(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              value={Cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="Date"
              variant="outlined"
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />
           
            <br />
            <Button
              onClick={add2}
              sx={{
                mt: 2,
              }}
              variant="contained"
            >
              {updatebutton ? "Update" : <AddCircleOutlineIcon />}
            </Button>
          </Box>
        </Modal> 
        }
        
       {/* <Popup1/> */}
        <div style={{display:"flex",widith:"100%",justifyContent:"flex-end",marginRight:"10px"}}>
       <TextField id="outlined-basic" 
       onChange={(e)=>setSearch(e.target.value)}
       label="Search" variant="outlined"  style={{backgroundColor:"white",borderRadius:"10px"}} />
       </div>
      </center>
<div className={classes.root} style={{textAlign:"center",width:"100%"}}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Cattle Finance" {...a11yProps(0)} />
          <Tab label="Daily Expense" {...a11yProps(1)} />
          <Tab label="Other Expense" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CATTLE ID</TableCell>
            <TableCell align="right">CATTLENAME</TableCell>
            <TableCell align="right">PurchaseCost</TableCell>
            <TableCell align="right">CattleExpense</TableCell>
            <TableCell align="right">SaleCost</TableCell>
            <TableCell align="right">Margin</TableCell>
 
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((e, i) =>  {
          
          return(
            <TableRow
            key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {e.CattleID}
              </TableCell>
              <TableCell align="center">{e.CattleName}</TableCell>
              <TableCell align="center">{e.PurchaseCost}</TableCell>
              <TableCell align="center">{e.CattleExpense}</TableCell>
              <TableCell align="center">{e.SaleCost}</TableCell>
              <TableCell align="center">{e.Margin}</TableCell>
              
              <TableCell>
              <Button onClick={() => upDate(e)}><UpdateIcon/></Button>
                  </TableCell>
                  <TableCell>
                  <IconButton
                onClick={() => deleteUser(e.key)}
                aria-label="delete"
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
          </TableCell>
            </TableRow>
          )})}

        </TableBody>
      </Table>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CATTLE RFID</TableCell>
            <TableCell align="right">CATTLENAME</TableCell>
            <TableCell align="right">ExpenseName</TableCell>
            <TableCell align="right">ExpenseCost</TableCell>
            <TableCell align="right">ExpenseDate</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userList2.map((e, i) => {
           let select=false;
           if(search !=="")
            {
               if(e.CattleID.toLowerCase().indexOf(search.toLowerCase())>-1 
               || e.CattleName.toLowerCase().indexOf(search.toLowerCase())>-1 
               )
               {
                 select = true
               } 
            }
            else{
              select = true
            }
            if(select)
            return(
            <TableRow
            key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {e.CattleID}
              </TableCell>
              <TableCell align="center">{e.CattleName}</TableCell>
              <TableCell align="center">{e.ExpenseName}</TableCell>
              <TableCell align="center">{e.ExpenseCost}</TableCell>
              <TableCell align="center">{e.ExpenseDate}</TableCell>
              
              <TableCell>
              <Button onClick={() => upDate1(e)}><UpdateIcon/></Button>
                  </TableCell>
                  <TableCell>
                  <IconButton
                onClick={() => deleteUser1(e.key)}
                aria-label="delete"
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
          </TableCell>
            </TableRow>
          )})}

        </TableBody>
      </Table>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CATTLE RFID</TableCell>
            <TableCell >Expense</TableCell>
            <TableCell >Cost</TableCell>
            <TableCell >Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList3.map((e, i) => {
            return(
            <TableRow
            key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {e.CattleID}
              </TableCell>
              <TableCell >{e.Expense}</TableCell>
              <TableCell >{e.Cost}</TableCell>
              <TableCell >{e.date}</TableCell>
              <TableCell>
              <Button onClick={() => upDate3(e)}><UpdateIcon/></Button>
                  </TableCell>
                  <TableCell>
                  <IconButton
                onClick={() => deleteUser3(e.key)}
                aria-label="delete"
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
          </TableCell>
            </TableRow>
          )})}

        </TableBody>
      </Table>
        </TabPanel>

      </SwipeableViews>
      
    </div>
   


    </div>
  </>
  );
}

export default Finance;