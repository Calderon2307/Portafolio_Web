import { useState, useEffect } from 'react';
import { getRandomApod } from '../../../services/apod.service';

function Random({ updateApods, addElementToApods, handleIsLoading }) {

    const [count, setCount] = useState(0);
    const [randomApods, setRandomApods] = useState([]);

    useEffect(() => {
        if (count != 0) getData();
    }, [count]);

    useEffect(() => {
        let randomArrayJSON = localStorage.getItem("randomApodsSaved");

        if (randomArrayJSON) {
            let info = JSON.parse(randomArrayJSON);

            if (info.length !== 0) {
                updateApods(info);
                setRandomApods(info);
                setCount(info.length + 1);
            } else {
                updateApods([]);
            }
        }
    }, []);

    useEffect(() => {
        if (randomApods.length > 0) saveApods();
    }, [randomApods]);

    const getData = async () => {
        handleIsLoading(true);
        let response = await getRandomApod();
        console.log(response);

        handleIsLoading(false);
        addElementToApods(response);
        setRandomApods((prev) => [...prev, ...response]);
    };

    const handleCount = (e) => {
        e.preventDefault();
        setCount(prev => prev += 1);
    };

    const saveApods = () => {
        localStorage.setItem('randomApodsSaved', JSON.stringify(randomApods));
    };

    const clearInfo = () => {
        localStorage.removeItem('randomApodsSaved');
        updateApods([]);
        addElementToApods([]);
        setRandomApods([]);
        setCount(0);
    };

    return (
        <div className="controls controls--stats container">
            <p>
                Count:
                <span id="count" className="control">{count}</span>
            </p>
            <form id="form" className="form" onSubmit={handleCount}>
                <button type="submit" id="btn-explore" className="control">
                    Explore
                </button>
            </form>
            <button type="button" id="btn-clear" className="control" onClick={clearInfo}>
                Clear
            </button>
        </div>
    );
}

export default Random;