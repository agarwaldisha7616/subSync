import React,{useEffect, useState} from "react";
import Header from "../components/Header";
import {auth, db} from "../firebase";
import { addDoc,collection, Firestore, Transaction } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import {query, where, getDocs } from "firebase/firestore";





const Dashboard = () => {
  
    const [transactions,setTransactions]=useState([]);
    const[loading,setLoading]=useState(false);
    const [user]=useAuthState(auth);


    

      

    
        
         


    


      return (
        <div>
            <Header />
            </div>
    );
}

export default Dashboard;
