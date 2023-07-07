import React, { useState, useEffect } from "react";
import axios from 'axios'
const CRUD = () => {
    const [formData, setFormData] = useState({
        prompt: ""
    });

    const [editID, setEditID] = useState()

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    const { prompt } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt) {
            axios.post('http://localhost:8080/app/completions', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ prompt: "" });

                })
                .catch(err => console.log(err))

        }
    };

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //         .then(res => {
    //             setData(res.data)
    //         })
    //         .catch(err => console.log(err))
    //     // console.log(data);
    // }, [refresh]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <h4> Lets make a call to ChatGPT openai API, Please submit your question</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="prompt">Ask Me Anything</label>
                            <input
                                type="text"
                                className="form-control"
                                id="prompt"
                                placeholder="Enter your question"
                                name="prompt"
                                value={prompt}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </form>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Chat GPT API Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index) => (
                                <tr key={index}>
                                    <td>{item}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default CRUD;