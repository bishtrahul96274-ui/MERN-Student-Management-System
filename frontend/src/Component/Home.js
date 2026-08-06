import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";
const emptyForm = {
    id: "",
    name: "",
    course: "",
    image: null,
};

function Home() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");

    const getData = async () => {
        const res = await fetch(`${API_URL}/`);
        const data = await res.json();
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const image = files[0];
            setFormData((prevData) => ({ ...prevData, image }));
            setPreview(image ? URL.createObjectURL(image) : "");
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setPreview("");
        setMessage("");
    };

    const handleEdit = (student) => {
        setEditingId(student.id);
        setFormData({
            id: student.id,
            name: student.name,
            course: student.course,
            image: null,
        });
        setPreview(student.image ? `${API_URL}${student.image}` : "");
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isUpdate = Boolean(editingId);
        setMessage("");

        const payload = new FormData();
        payload.append("id", formData.id);
        payload.append("name", formData.name);
        payload.append("course", formData.course);
        if (formData.image) {
            payload.append("image", formData.image);
        }

        const url = isUpdate ? `${API_URL}/students/${editingId}` : `${API_URL}/students`;
        const method = isUpdate ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            body: payload,
        });

        const result = await res.json();

        if (!res.ok) {
            setMessage(result.message || "Something went wrong");
            return;
        }

        await getData();
        resetForm();
        setMessage(isUpdate ? "Student updated successfully" : "Student inserted successfully");
    };

    return (
        <section className="page-card">
            <div className="hero-section">
                <p className="eyebrow">Full Stack Learning</p>
                <h1>Build better MERN projects with clean practice data.</h1>
                <p className="hero-text">Browse your student/course records from the backend and use the navigation above to explore the app.</p>
            </div>

            <div className="form-card">
                <div className="section-title">
                    <div>
                        <p className="eyebrow">{editingId ? "Edit Student" : "New Student"}</p>
                        <h2>{editingId ? "Update Student Data" : "Insert Student Data"}</h2>
                    </div>
                    {editingId && (
                        <button className="btn ghost-btn" type="button" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>

                <form className="student-form" onSubmit={handleSubmit}>
                    <label>
                        ID
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Enter ID"
                            disabled={Boolean(editingId)}
                            required
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </label>
                    <label>
                        Course
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            placeholder="Enter course"
                            required
                        />
                    </label>
                    <label>
                        Image
                        <input type="file" name="image" accept="image/*" onChange={handleChange} />
                    </label>

                    <div className="image-preview">
                        {preview ? <img src={preview} alt="Student preview" /> : <span>No image</span>}
                    </div>

                    <button className="btn primary-btn" type="submit">
                        {editingId ? "Update" : "Insert"}
                    </button>
                </form>

                {message && <p className="form-message">{message}</p>}
            </div>

            <div className="table-card">
                <div className="section-title">
                    <div>
                        <p className="eyebrow">Dashboard</p>
                        <h2>Student Data</h2>
                    </div>
                    <span className="pill">{data.length} Records</span>
                </div>

                <div className="table-responsive">
                    <table className="table app-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        {item.image ? (
                                            <img className="student-img" src={`${API_URL}${item.image}`} alt={item.name} />
                                        ) : (
                                            <span className="empty-img">No image</span>
                                        )}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.course}</td>
                                    <td>
                                        <button className="btn edit-btn" type="button" onClick={() => handleEdit(item)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Home;
