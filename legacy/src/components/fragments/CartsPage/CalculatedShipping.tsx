import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProvince } from "../../../utililties/api/CekOngkir/getProvince";
import { getKabupaten } from "../../../utililties/api/CekOngkir/getKabupaten";
import { getKecamatans } from "../../../utililties/api/CekOngkir/getKecamatan";
import { getKelurahan } from "../../../utililties/api/CekOngkir/getKelurahan";
import Button from "../../elements/Button/Button";
import { cekOngkir } from "../../../utililties/api/CekOngkir/cekOngkir";
import { Loader2 } from "lucide-react";
import { CartType } from "../../../types/CartType";
import { useCart } from "../../../utililties/customHook/useCart";


const CalculatedShipping = () => {

    const { carts } = useCart()
    const [selectedCodeProvince, setSelectedCodeProvince] = useState<string>('');
    const [selectedCodeKabupaten, setSelectedCodeKabupaten] = useState<string>('');
    const [selectedCodeKecamatan, setSelectedCodeKecamatan] = useState<string>('');
    const [selectedCodeKelurahan, setSelectedCodeKelurahan] = useState<string>('');
    const [selectedCourier, setSelectedCourier] = useState<string>('');

    const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvince(),
    });

    const { data: kabupatens, isLoading: isLoadingKabupaten } = useQuery({
        queryKey: ['kabupaten', selectedCodeProvince],
        queryFn: () => getKabupaten(selectedCodeProvince),
        enabled: !!selectedCodeProvince
    });

    const { data: kecamatans, isLoading: isLoadingKecamatan } = useQuery({
        queryKey: ['kecamatan', selectedCodeKabupaten],
        queryFn: () => getKecamatans(selectedCodeKabupaten),
        enabled: !!selectedCodeKabupaten
    });

    const { data: kelurahans, isLoading: isLoadingKelurahan } = useQuery({
        queryKey: ['kelurahan', selectedCodeKecamatan],
        queryFn: () => getKelurahan(selectedCodeKecamatan),
        enabled: !!selectedCodeKecamatan
    })

    const calculateShipping = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const origin = '59265'; // default postal code from SALE, KAB. REMBANG, JAWA TENGAH
        const destination = kelurahans?.find((item) => item.code === selectedCodeKelurahan)?.postal_code;
        const weight = carts?.reduce((acc, item) => acc + item.productVariant.weight * item.quantity, 0)
        const courier = selectedCourier;

        await cekOngkir({ origin, destination, weight, courier });
    }

    const unSelectedFormInput = () => {
        return !selectedCodeProvince || !selectedCodeKabupaten || !selectedCodeKecamatan || !selectedCodeKelurahan || !selectedCourier
    }

    return (
        <>
            <form onSubmit={calculateShipping} className="p-2 flex flex-col gap-5">
                {/* <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" className="rounded-md" placeholder="Enter your name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name="phone" id="phone" className="rounded-md" placeholder="Enter your phone number" />
                            </div> */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="province" className="flex gap-1 items-center">Provinsi {isLoadingProvinces && <Loader2 className="animate-spin" />}</label>
                    <select className={`rounded-md ${isLoadingProvinces && 'cursor-not-allowed animate-pulse'}`} id="province" value={selectedCodeProvince} onChange={(e) => setSelectedCodeProvince(e.target.value)}>
                        <option value="" disabled>-- Select Province --</option>
                        {provinces && provinces.map((province, index) => (
                            <option key={index} value={province.code}>{province.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="kabupaten" className="flex gap-1 items-center">Kabupaten {isLoadingKabupaten && <Loader2 className="animate-spin" />}</label>
                    <select className={`rounded-md ${isLoadingKabupaten && 'cursor-not-allowed animate-pulse'}`} id="kabupaten" value={selectedCodeKabupaten} onChange={(e) => setSelectedCodeKabupaten(e.target.value)}>
                        <option value="" disabled>-- Select Kabupaten --</option>
                        {kabupatens && kabupatens.map((kabupaten, index) => (
                            <option key={index} value={kabupaten.code}>{kabupaten.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="kecamatan" className="flex gap-1 items-center">Kecamatan {isLoadingKecamatan && <Loader2 className="animate-spin" />}</label>
                    <select className={`rounded-md ${isLoadingKecamatan && 'cursor-not-allowed animate-pulse'}`} id="kecamatan" value={selectedCodeKecamatan} onChange={(e) => setSelectedCodeKecamatan(e.target.value)}>
                        <option value="" disabled>-- Select Kecamatan --</option>
                        {kecamatans && kecamatans.map((kecamatan, index) => (
                            <option key={index} value={kecamatan.code}>{kecamatan.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="kelurahan" className="flex gap-1 items-center">Kelurahan {isLoadingKelurahan && <Loader2 className="animate-spin" />}</label>
                    <select className={`rounded-md ${isLoadingKelurahan && 'cursor-not-allowed animate-pulse'}`} id="kelurahan" value={selectedCodeKelurahan} onChange={(e) => setSelectedCodeKelurahan(e.target.value)}>
                        <option value="" disabled>-- Select Kelurahan --</option>
                        {kelurahans && kelurahans.map((kelurahan, index) => (
                            <option key={index} value={kelurahan.code}>{kelurahan.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="courier">Courier</label>
                    <select className="rounded-md" id="courier" value={selectedCourier} onChange={(e) => setSelectedCourier(e.target.value)}>
                        <option value="" disabled>-- Select Courier --</option>
                        <option value="jne">JNE</option>
                        {/* <option value="tiki">TIKI</option> */}
                        <option value="pos">POS</option>
                    </select>
                </div>

                <Button type="submit" variant={`bg-black text-white p-2 rounded-md ${unSelectedFormInput() && 'cursor-not-allowed bg-black/50'}`} >Update</Button>
            </form>
        </>
    )
}


export default CalculatedShipping;