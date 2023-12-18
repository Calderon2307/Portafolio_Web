import { useEffect, useState } from 'react';
import { getApodByDate } from '../../../services/apod.service';

function Date({ updateApods, handleIsLoading }) {

    const [date, setDate] = useState('');

    useEffect(() => {
        updateApods([]);
    },[]);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const getData = async (e) => {
        e.preventDefault();
        handleIsLoading(true);
        let response = await getApodByDate(date)

        handleIsLoading(false);
        updateApods(response);
    };

    return (
        <div className="controls container">
            <form id="form" className="form" onSubmit={getData}>
                <label htmlFor="from-date">Date:</label>
                <input
                    type="date"
                    id="from-date"
                    name="from-date"
                    className="control"
                    required
                    onChange={handleDateChange}
                />
                <button type="submit" className="control">Submit</button>
            </form>
        </div>
    );
}

export default Date;