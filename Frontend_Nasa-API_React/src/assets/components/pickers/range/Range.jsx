import { useEffect, useState } from 'react';
import { getApodsByRange } from '../../../services/apod.service';

function Range({ updateApods, handleIsLoading }) {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        updateApods([]);
    }, []);

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const getData = async (e) => {
        e.preventDefault();
        handleIsLoading(true)
        let response = await getApodsByRange(fromDate, toDate);
        // console.log(response);

        handleIsLoading(false);
        updateApods(response);
    };

    return (
        <div className="controls container">
            <form id="form" className="form" onSubmit={getData}>
                <fieldset className="form__fieldset">
                    <legend className="sr-only">Date</legend>

                    <label htmlFor="from-date">from:</label>
                    <input
                        type="date"
                        id="from-date"
                        name="from-date"
                        className="control"
                        required
                        onChange={handleFromDateChange}
                    />
                    <label htmlFor="to-date">to:</label>
                    <input
                        type="date"
                        id="to-date"
                        name="to-date"
                        className="control"
                        required
                        onChange={handleToDateChange}
                    />
                </fieldset>

                <button type="submit" className="control">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Range;