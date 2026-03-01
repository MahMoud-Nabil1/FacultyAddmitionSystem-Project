import React, { useEffect, useState, FormEvent } from "react";
import { createStudent, getAllStudents } from "../../services/api";
import Pagination from "./pagination";
import { PAGE_SIZE } from "./constants";

interface Student {
    _id: string;
    studentId: string;
    name: string;
    email: string;
    gpa: string;
}

interface StudentForm {
    studentId: string;
    name: string;
    email: string;
    password: string;
    gpa: string;
}

const StudentPanel: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [page, setPage] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [form, setForm] = useState<StudentForm>({
        studentId: "",
        name: "",
        email: "",
        password: "",
        gpa: "",
    });
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Load students
    const loadStudents = async () => {
        try {
            const data = await getAllStudents();
            setStudents(data);
        } catch {
            setError("فشل تحميل قائمة الطلاب");
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    // Submit handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createStudent(form);
            setForm({ studentId: "", name: "", email: "", password: "", gpa: "" });
            setShowForm(false);
            await loadStudents();
        } catch (err: any) {
            if (err.status === 409) {
                setError("طالب بنفس الكود موجود بالفعل");
            } else {
                setError(err.data?.error || err.message || "حدث خطأ غير متوقع");
            }
        } finally {
            setLoading(false);
        }
    };

    // Toggle form visibility
    const toggleForm = () => {
        if (showForm) {
            setForm({ studentId: "", name: "", email: "", password: "", gpa: "" });
            setError(null);
        }
        setShowForm(!showForm);
    };

    const slicedStudents = students.slice(
        page * PAGE_SIZE,
        page * PAGE_SIZE + PAGE_SIZE
    );

    return (
        <div className="dashboard-container">
            <h2>الطلاب</h2>

            <button className="add-btn" onClick={toggleForm}>
                {showForm ? "الغاء" : "اضف طالب جديد"}
            </button>

            {showForm && (
                <form className="form" onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}

                    <input
                        placeholder="كود الطالب"
                        value={form.studentId}
                        onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    />
                    <input
                        placeholder="الإسم"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        placeholder="الإيميل"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        placeholder="المعدل التراكمى"
                        value={form.gpa}
                        onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="كلمة السر"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="submit-btn" disabled={loading}>
                        {loading ? "جارٍ التسجيل..." : "سجل طالب جديد"}
                    </button>
                </form>
            )}

            <table>
                <thead>
                <tr>
                    <th>كود الطالب</th>
                    <th>الإسم</th>
                    <th>الإيميل</th>
                    <th>المعدل التراكمى</th>
                    <th>ID</th>
                </tr>
                </thead>
                <tbody>
                {slicedStudents.map((s) => (
                    <tr key={s._id}>
                        <td>{s.studentId}</td>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.gpa}</td>
                        <td>
                            <button
                                className="copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(s._id);
                                    setCopiedId(s._id);
                                    setTimeout(() => setCopiedId(null), 3000);
                                }}
                            >
                                {copiedId === s._id ? "تم!" : "نسخ"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination page={page} setPage={setPage} total={students.length} />
        </div>
    );
};

export default StudentPanel;