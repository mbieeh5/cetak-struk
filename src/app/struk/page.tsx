"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
interface dataStruk {
    tanggal: string,
    bank: string,
    penerima: string,
    norek: string,
    pengirim: string,
    berita: string,
    nominal: string,
    admin: string,
    totalbyr: number,
}

export default function CetakStruk() {

    const [data, setData] = useState<dataStruk[]>([]);
    const Router = useRouter();

    const handlePrint = () => {
        // Simpan referensi ke area cetak
        const printArea = document.getElementById('printArea');
        if (printArea) {
            const originalContent = document.body.innerHTML;
            const printContent = printArea.innerHTML;
            document.body.innerHTML = `
                <html>
                <head>
                    <title>Print</title>
                    <style>
                        /* Tambahkan CSS untuk memformat halaman cetak */
                        .no-print { display: none; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
                </html>
            `;
            window.print();
            // Kembalikan ke konten asli setelah mencetak
            document.body.innerHTML = originalContent;
        }
    }

    const handleBack = () => {
        Router.push('/')
    }

    useEffect(() => {
        const datas = sessionStorage.getItem('strukData');

        if (datas) {
            try {
                const parsedData = JSON.parse(datas);
                if (parsedData) {
                    const arrayDatas: dataStruk[] = Object.values({parsedData});
                    setData(arrayDatas);
                } else {
                    console.error("Data format is incorrect.");
                }
            } catch (error) {
                console.error("Failed to parse sessionStorage data", error);
            }
        }
    }, []);

    return (
        <>
            <section id="printArea" className="isolate bg-white px-12 py-5 rounded text-black">
            {data.length > 0 ? (
                data.map((a, i) => (
                    <div key={i} className="grid justify-items-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Glory Cell</h2>
                            <p className="mt-2 text-m leading-3 text-gray-600">
                                JLN. RAYA CIKARET NO 002B
                            </p>
                            <p className="mt-2 text-m text-gray-600">
                                CIBINONG - BOGOR
                            </p>
                            <p className="mt-2 text-m leading-1 text-gray-600">
                                {a.tanggal}
                            </p>
                        <h2 className="mt-2 text-2xl font-italic tracking-tight text-gray-900 sm:text-1xl">Transfer Antar Bank</h2>
                        <div className="flex justify-between border-b border-gray-300 py-2">
                        </div>
                        <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-1">
                            <div className="flex justify-between text-gray-700 font-medium ">
                                <span>Bank:</span>
                                <span className="font-normal">{a.bank}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium ">
                                <span>NoRek:</span>
                                <span className="font-bold text-gray-900">{a.norek}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium">
                                <span>Nama:</span>
                                <span className="font-bold text-gray-900">{a.penerima}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium">
                                <span>Pengirim:</span>
                                <span className="font-normal">{a.pengirim}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium">
                                <span>Berita:</span>
                                <span className="font-normal">{a.berita}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 py-2">
                                <span>Nominal:</span>
                                <span className="font-bold text-gray-900">Rp. {a.nominal}.-</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium ">
                                <span className="font-normal text-center ">Struk ini sebagai bukti pembayaran yang sah mohon disimpan.</span>
                            </div>

                            <div className="flex justify-between text-gray-700 font-medium ">
                                <span>Admin:</span>
                                <span className="font-normal">
                                <span className="font-normal">Rp. {a.admin}.-</span>
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium ">
                                <span>Total Bayar:</span>
                                <span className="font-normal">Rp. {a.totalbyr.toLocaleString('id-ID')}.-</span>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
            </section>
            <div className="grid flex gap-4 justify-items-center my-4">
                <button
                onClick={() => {handlePrint()}}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Print Data
                </button>
                <button
                onClick={() => {handleBack()}}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Kembali
                </button>
            </div>
        </>
    );
}
