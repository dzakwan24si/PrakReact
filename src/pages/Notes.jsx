import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { notesAPI } from "../service/notesAPI"
import AlertBox from "@/components/AlertBox";
import GenericTable from "@/components/GenericTable";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";

export default function Notes() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    
    const [dataForm, setDataForm] = useState({
        title: "", content: "", status: ""
    })

    const [notes, setNotes] = useState([])

    // Handle perubahan nilai input form
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    // Handle form submission for creating notes
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await notesAPI.createNote(dataForm)

            setSuccess("Catatan berhasil ditambahkan!")

            // Kosongkan Form setelah Success
            setDataForm({ title: "", content: "", status:"" })

            // Hilangkan pesan Success setelah 3 detik
            setTimeout(() => setSuccess(""), 3000)
            
            //Panggil Ulang loadNotes untuk refresh data
            loadNotes()
            
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false)
        }
    }

    // Handle untuk aksi hapus data
    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus catatan ini?")
        if (!konfirmasi) return

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await notesAPI.deleteNote(id)

            // Refresh data
            loadNotes()
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    // Load data saat pertama di-render
    useEffect(() => {
        loadNotes()
    }, [])

     // Memanggil fetchNotes beserta error/loading handling
    const loadNotes = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await notesAPI.fetchNotes()
            setNotes(data)
        } catch (err) {
            setError("Gagal memuat catatan")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 animate-fade-in">
            <PageHeader title="Notes" breadcrumb={["Notes", "List"]} />
		<div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Notes App
            </h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tambah Catatan Baru
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={dataForm.title}
                    disabled={loading}
                    placeholder="Judul catatan"
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
                />

                <textarea
                    name="content"
                    value={dataForm.content}
                    placeholder="Isi catatan"
                    onChange={handleChange}
                    disabled={loading}
                    required
                    rows="2"
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200 resize-none"
                />

                <Button
                    variant="outline"
                >
                    {loading ? "Mohon Tunggu..." : "Tambah Data"}
                </Button>
            </form>
            {error && <AlertBox type="error">{error}</AlertBox>}
	
	        {success && <AlertBox type="success">{success}</AlertBox>}
        </div>

        {/* Notes Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <div className="px-6 py-4 ">
            <h3 className="text-lg font-semibold">
                Daftar Catatan ({notes.length})
            </h3>
        </div>
		</div>
        {loading && <LoadingSpinner text="Memuat catatan..." />}

        {!loading && notes.length === 0 && !error &&(
            <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
        )}

        {!loading && notes.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}
        
        {!loading && notes.length > 0 ?(
		    <GenericTable
            columns={["#", "Judul", "Isi Catatan","Aksi"]}
            data={notes}
            renderRow={(note, index) => (
                <>
                    <td className="px-6 py-4 font-medium text-gray-700">
                        {index + 1}.
                    </td>
                    <td className="px-6 py-4">
                        <div className="font-semibold text-emerald-600">
                            {note.title}
                        </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                        <div className="truncate text-gray-600">
                            {note.content}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <Button type="danger" variant="destructive" onClick={() => handleDelete(note.id)} disabled={loading}>
                            Hapus
                        </Button>
                    </td>
                </>
            )}
        />
		    ) : null}


    </div>
</div>
);
}

