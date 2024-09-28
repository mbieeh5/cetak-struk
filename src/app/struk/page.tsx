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
    lokasi:string;
}

export default function CetakStruk() {

    const [data, setData] = useState<dataStruk[]>([]);
    const Router = useRouter();

    const handlePrint = () => {
        const printArea = document.getElementById('printArea');
        if (printArea) {
            const printContent = printArea.innerHTML;
            const styleSheets = Array.from(document.styleSheets)
                .map((sheet) => {
                    try {
                        return Array.from(sheet.cssRules)
                            .map((rule) => rule.cssText)
                            .join('\n');
                    } catch (e) {
                        console.warn("Error reading CSS rules: ", e);
                        return '';
                    }
                })
                .join('\n');

            const printWindow = window.open('', '', 'width=600,height=600');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                    <head>
                        <title>Print</title>
                        <style>
                            ${styleSheets} /* Menyertakan semua CSS */
                        </style>
                    </head>
                    <body>
                        ${printContent}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
        }
    };
    
    

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
                        {a.lokasi === "Cikaret" ? 
                        <>
                            <p className="text-l font-bold tracking-tight text-gray-900 sm:text-l">Glory Cell</p>
                            <p className=" text-xs leading-3 text-gray-600">
                                JLN. RAYA CIKARET NO 002B
                            </p>
                            <p className=" text-xs text-gray-600">
                                CIBINONG - BOGOR
                            </p>
                            <p className=" text-xs leading-1 text-gray-600">
                                {a.tanggal}
                            </p>
                        </>
                        : <>
                            <p className="text-l font-bold tracking-tight text-gray-900 sm:text-l">Glory Cell</p>
                            <p className=" text-xs leading-3 text-gray-600">
                                JLN. RAYA SUKAHATI NO 01
                            </p>
                            <p className=" text-xs text-gray-600">
                                CIBINONG - BOGOR
                            </p>
                            <p className=" text-xs leading-1 text-gray-600">
                                {a.tanggal}
                            </p>
                        </>
                        }
                        <h2 className="mt-2 text-s font-italic tracking-tight text-gray-900 sm:text-1xl border-b border-gray-300">Transfer Antar Bank</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1">
                            <div className="flex justify-between text-gray-700 font-medium text-sm">
                                <span>Bank:</span>
                                <span className="font-normal">{a.bank}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium text-sm">
                                <span>NoRek:</span>
                                <span className="font-bold text-gray-900">{a.norek}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium text-sm">
                                <span>Nama:</span>
                                <span className="font-bold text-gray-900 break-words text-right max-w-[60%]">{a.penerima}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium text-sm">
                                <span>Pengirim:</span>
                                <span className="font-normal">{a.pengirim}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium text-sm">
                                <span>Berita:</span>
                                <span className="font-normal">{a.berita}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 py-2 text-sm">
                                <span>Nominal:</span>
                                <span className="font-bold text-gray-900">Rp. {a.nominal}.-</span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium text-sm ">
                                <span className="font-normal text-center ">Struk ini sebagai bukti pembayaran yang sah mohon disimpan.</span>
                            </div>

                            <div className="flex justify-between text-gray-700 font-medium text-sm ">
                                <span>Admin:</span>
                                <span className="font-normal">
                                <span className="font-normal">Rp. {a.admin}.-</span>
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-700 font-medium text-sm ">
                                <span>Total Bayar:</span>
                                <span className="font-normal">Rp. {a.totalbyr.toLocaleString('id-ID')}.-</span>
                            </div>
                            <br/>
                            <div className="flex flex-col text-center text-gray-700 font-medium ">
                                <div>
                                <span className="font-normal text-center ">TERIMA KASIH</span>
                                </div>
                                <div>
                                    {a.lokasi === "Cikaret" ? <span className="font-normal text-center ">CS-WA: 08811429638</span> : <span className="font-normal text-center ">CS-WA: 08973997575</span>}
                                </div>
                            </div>
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
