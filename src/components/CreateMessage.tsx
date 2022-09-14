import React, { useState } from "react";
import { addMessage } from "../services/chain/apis/extrinsic";
import { SchemaProps, SchemaDetails } from "../services/types";
import { staticSchema } from "./RegisterSchema";


const CreateMessage = (props: SchemaProps): JSX.Element => {
    const [messagevalues, setMessageValues] = useState({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setMessageValues(values => ({...values, [name]: value }))
    }

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = parseFloat(event.target.value);
        setMessageValues(values => ({...values, [name]: value }))
    }

    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = validateMessage();
        if (isValid) {
            submitMessage();
            setMessageValues({});
            var formEl = document.getElementById("message-form");
            (formEl as HTMLFormElement)?.reset();
        };
    }

    const validateMessage = (): boolean => {
        const valid = staticSchema.isValid({ nickname:'omar',favorite_number: 6,favorite_restaurant:'Ramen Takeya'});
        // console.log("is example valid? ", valid);
        console.dir(messagevalues);
        // also check size of message
        const isMsgValid = staticSchema.isValid(messagevalues);
        console.log("is submited message valid", isMsgValid);
        return isMsgValid;
    }

    const submitMessage =  async () => {
        let message: Buffer = staticSchema.toBuffer(messagevalues);
        addMessage(message, parseInt(props?.schema?.schema_id));
        console.log("selected schema id: ", props.schema?.schema_id);
        console.log("submit message func finished");
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit} id="message-form">
            <label>Enter nickname:
            <input
                type="text"
                name="nickname"
                placeholder="Enter nickname"
                className="input"
                onChange={handleChange} />
            </label>
            <label>Enter Favorite Number:
            <input
                type="number"
                name="favorite_number"
                placeholder="0"
                className="input"
                onChange={handleChangeNumber} />
            </label>
            <label>Enter Favorite Restaurant
            <input
                type="text"
                name="favorite_restaurant"
                placeholder="Enter Restaurant name"
                className="input"
                onChange={handleChange} />
            </label>
        <button type="submit" className="btn">Submit Message</button>
        </form>
        </div>
    )
}

export default CreateMessage;