import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxioxPrivate";
import { FaPencilAlt } from "react-icons/fa";

const VerifyInfo = () => {
    const { auth } = useAuth();
    const [userData, setUserData] = useState({});
    const axiosPrivate = useAxiosPrivate();

    const [name, setName] = useState("Elon Musk");
    const [address, setAddress] = useState("26 Raoudha Mosque Road, Fouchena, Paris Saint Germain");
    const [phone, setPhone] = useState("+216 42069666");

    const [editableField, setEditableField] = useState(null);

    const getUserData = async () => {
        try {
            const result = await axiosPrivate.get("/getAccountInfo");
            setUserData(result.data.accountInfo);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleEditField = (fieldName) => {
        setEditableField(fieldName);
    };

    const handleFieldChange = (event, setter) => {
        if (event.key === "Enter") {
            setEditableField(null);
        } else {
            setter(event.target.value);
        }
    };

    const handleFieldBlur = () => {
        setEditableField(null);
    };

    const isFieldEditable = (fieldName) => {
        return editableField === fieldName;
    };

    return (
        <div className="flex flex-col p-6 rounded-sm gap-12 border-2" style={{ width: "800px" }}>
            <h1 className="text-4xl font-semibold">Verify your information</h1>
            <div className="flex flex-row text-xl items-center gap-2">
                <label className="w-40" htmlFor="name">
                    Name:
                </label>
                <input
                    className={`h-10 border-2 rounded-lg px-2 flex items-center ${isFieldEditable("name") ? "bg-transparent" : "bg-slate-100"}`}
                    style={{ width: "520px" }}
                    type="text"
                    name="name"
                    disabled={!isFieldEditable("name")}
                    value={name}
                    onChange={(event) => handleFieldChange(event, setName)}
                    onBlur={handleFieldBlur}
                    onKeyDown={(event) => event.key === "Enter" && handleFieldChange(event, setName)}
                />
                <button className="text-gray-500" onClick={() => handleEditField("name")}>
                    <FaPencilAlt />
                </button>
            </div>
            <div className="flex flex-row text-xl items-center gap-2">
                <label className="w-40" htmlFor="address">
                    Address:
                </label>
                <input
                    className={`h-10 border-2 rounded-lg px-2 flex items-center ${isFieldEditable("address") ? "bg-transparent" : "bg-slate-100"}`}
                    style={{ width: "520px" }}
                    type="text"
                    name="address"
                    disabled={!isFieldEditable("address")}
                    value={address}
                    onChange={(event) => handleFieldChange(event, setAddress)}
                    onBlur={handleFieldBlur}
                    onKeyDown={(event) => event.key === "Enter" && handleFieldChange(event, setAddress)}
                />
                <button className="text-gray-500" onClick={() => handleEditField("address")}>
                    <FaPencilAlt />
                </button>
            </div>
            <div className="flex flex-row text-xl items-center gap-2">
                <label className="w-40" htmlFor="phone">
                    Phone number:
                </label>
                <input
                    className={`h-10 border-2 rounded-lg px-2 flex items-center ${isFieldEditable("phone") ? "bg-transparent" : "bg-slate-100"}`}
                    style={{ width: "520px" }}
                    type="text"
                    name="phone"
                    disabled={!isFieldEditable("phone")}
                    value={phone}
                    onChange={(event) => handleFieldChange(event, setPhone)}
                    onBlur={handleFieldBlur}
                    onKeyDown={(event) => event.key === "Enter" && handleFieldChange(event, setPhone)}
                />
                <button className="text-gray-500" onClick={() => handleEditField("phone")}>
                    <FaPencilAlt />
                </button>
            </div>
        </div>
    );
};

export default VerifyInfo;
