'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


export default function InputForm() {
  
  const [nominal, setNominal] = useState<number>(10000);
    const [bank, setBank] = useState<string>('');
    const [penerima, setPenerima] = useState<string>('');
    const [admin, setAdmin] = useState<number>(0);
    const [totalByr, setTotalByr] = useState<number>(0);
    const [tanggal, setTanggal] = useState<string>("")
    const [lokasi, setLokasi] = useState<string>('Cikaret');
    const router = useRouter();

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${day}/${month}/${year}@${hours}:${minutes}:${seconds}`;
    };

    const calculation = useCallback((num: number) => {
        if(num <= 500000){
            setAdmin(5000);
            setTotalByr(5000 + num);
            return;
        }
        if(num <= 1000000){
            setAdmin(10000);
            setTotalByr(10000 + num);
            return;
        }
        if(num <= 3000000){
            setAdmin(15000);
            setTotalByr(15000 + num);
            return;
        }
        if(num <= 5000000){
            setAdmin(20000);
            setTotalByr(20000 + num);
            return;
        }
        if(num <= 10000000){
            setAdmin(25000);
            setTotalByr(25000 + num);
            return;
        }
        setAdmin(admin);
        setTotalByr(admin + num);
        return;
    },[admin])

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      setTanggal(formatDate(new Date()));
  
      const formData = new FormData(e.currentTarget);
      const bank = formData.get('bank') as string;
      const lokasi = formData.get('lokasi') as string;
      const norek = formData.get('norek') as string;
      const penerima = formData.get('penerima') as string;
      const berita = formData.get('berita') as string || "GloryCell";
      const nominal = formData.get('nominal') as string;
      const nominalConverter = parseInt(nominal).toLocaleString('id-ID');
      const admin = formData.get('admin') as string;
      const adminConverter = parseInt(admin).toLocaleString('id-ID');
      const totalbyr = formData.get('totalbyr') as string;
  
      const dataStruk = {
          tanggal: tanggal.toString(),
          lokasi,
          bank,
          norek,
          penerima,
          pengirim : "RAFI ANGGORO",
          berita,
          nominal: nominalConverter,
          admin: adminConverter,
          totalbyr,
      };
      sessionStorage.setItem('strukData', JSON.stringify(dataStruk));
      router.push('/struk-transfer');
    };

    const handleResetForm = () => {
    location.reload();
    }

  useEffect(() => {
    
    const dateNow:Date = new Date();
    setTanggal(formatDate(dateNow));
    calculation(nominal)
}, [calculation, nominal]);
  
  return (
    <div className="isolate bg-white px-12 py-5 rounded">
      <form action="#" method="POST" className="mx-auto mt-7 max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-1">
          <div className='sm:col-span2'>
          <label htmlFor="lokasi" className="block text-sm font-semibold leading-6 text-gray-900">
              Lokasi
            </label>
              <select 
              id='lokasi'
              name='lokasi'
              value={lokasi}
              onChange={(e) => {setLokasi(e.target.value)}}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option>Cikaret</option>
                <option>Sukahati</option>
              </select>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor="bank" className="block text-sm font-semibold leading-6 text-gray-900">
              Bank
            </label>
            <div className="mt-2.5">
              <input
                id="bank"
                name="bank"
                type="text"
                autoComplete="bank"
                value={bank.toLocaleUpperCase()}
                onChange={(e) => {setBank(e.target.value)}}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor="norek" className="block text-sm font-semibold leading-6 text-gray-900">
              Nomor Rekening
            </label>
            <div className="mt-2.5">
              <input
                id="norek"
                name="norek"
                type="text"
                pattern="[0-9]*"
                defaultValue={''}
                autoComplete="norek"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor="penerima" className="block text-sm font-semibold leading-6 text-gray-900">
              Nama Penerima
            </label>
            <div className="mt-2.5">
              <input
                id="penerima"
                name="penerima"
                type="text"
                autoComplete="family-name"
                value={penerima.toLocaleUpperCase()}
                onChange={(e) => {setPenerima(e.target.value)}}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="berita" className="block text-sm font-semibold leading-6 text-gray-900">
              Berita
            </label>
            <div className="mt-2.5">
              <input
                id="berita"
                name="berita"
                type="text"
                autoComplete="berita"
                required
                defaultValue={'GloryCell'}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="nominal" className="block text-sm font-semibold leading-6 text-gray-900">
              Nominal
            </label>
            <div className="mt-2.5">
              <input
                id="nominal"
                name="nominal"
                type="text"
                pattern="[0-9]*"
                value={nominal}
                autoComplete="nominal"
                required
                onChange={(e) => {setNominal(parseInt(e.target.value))}}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="admin" className="block text-sm font-semibold leading-6 text-gray-900">
              Admin
            </label>
            <div className="mt-2.5">
              <input
                id="admin"
                name="admin"
                defaultValue={admin.toLocaleString('id-ID')}
                value={admin}
                onChange={(e) => {setAdmin(parseInt(e.target.value))}}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="totalbyr" className="block text-sm font-semibold leading-6 text-gray-900">
              Total Bayar
            </label>
            <div className="mt-2.5">
              <input
                id="totalbyr"
                name="totalbyr"
                readOnly
                value={totalByr.toLocaleString('id-ID')}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cetak
          </button>
          </div>
          <div className="mt-10">
          <button
            type="button"
            onClick={() => {handleResetForm()}}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Reset
          </button>
            </div>
      </form>
    </div>
  )
}
