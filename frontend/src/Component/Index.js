import React, { useEffect, useState } from "react";

function Data() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const getData = async () => {
      try {
        const res = await fetch(
          "https://mern-student-management-system-1.onrender.com/"
        );

        const result = await res.json();

        setData(result);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    getData();

  }, []);

  return (

    <div className="row">

      <div className="col-md-2"></div>

      <div className="col-md-8">

        <h1>Data</h1>

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
            </tr>
          </thead>

          <tbody>

            {data.map((item) => (

              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Data;