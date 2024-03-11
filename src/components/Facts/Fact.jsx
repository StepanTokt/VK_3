import React, { useState, useRef, useEffect } from "react";
import Service from "../../Service/Service";
import './Fact.css'
import Spinner from "../../Spinner/Spinner";

const Fact = () => {
    const [fact, setFact] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const myRef = useRef(null);
    const { getFact, setProcess, process } = Service();

    useEffect(() => {
        if (myRef.current && fact.fact) {
            const words = fact.fact.split(" ");
            if (words.length > 0) {
                const cursorPosition = words[0].length
                myRef.current.setSelectionRange(cursorPosition, cursorPosition);
                myRef.current.focus();
            }
        }
    }, [fact])

    const updateData = () => {
        setButtonEnabled(false);
        getFact()
            .then(onDataLoaded)
            .then(() => setProcess('confirmed'))
            .catch(() => setProcess('noData'))
            .finally(() => setButtonEnabled(true))
    }
  
    const onDataLoaded = (value) => {
        if (value.length === 0 && (process !== 'loading' || process !== 'waiting')) throw new Error('No data');
        setFact(value);
    }

    return (
        <div className='div-fact'>
            {buttonEnabled ?
            <textarea cols="30" rows="10" 
            value={fact.fact} 
            onChange={(e) => setFact(e.target.value)}
            placeholder="Here you will see an interesting fact"
            ref={myRef}/>
            :
            <div className="div-spinner">
                <Spinner/>
            </div>
            }
            <button 
            style={{backgroundColor: buttonEnabled ? 'black' : 'red'}} 
            onClick={updateData} 
            disabled={!buttonEnabled}>Get Fact</button>
        </div>
    )
}

export default Fact;
