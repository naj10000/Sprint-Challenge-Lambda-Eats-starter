import React, { useState, useEffect } from 'react'

import * as Yup from "yup";

export default function Forms() {

    const [formState, setFormState] = useState({
        name: "",
        sizes: "",
        toppings:"",
         instructions: ""


    })

    const [errors, setErrors] = useState({
        name: "",
        sizes: "",
        toppings:"",
         instructions: ""


    })

    const formSchema = yup.object().shape({
        name: yup.string().min(2, "name too short").required("Need a name"),

        sizes: yup.string().required("choose a pizza size"),
        toppings: yup.string().required("choose a topping")

    })

    useEffect(()=>{
        formSchema.isValid(formState).then(valid=>{
            setButtonDisabled(!valid);
        })
    }, [formState])

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
    }

    return (
        <div>
            <form>
                <label> Name
                    <input

                    id="name"
                    type="text"
                    name="name"
                    placeholder="name"
                    
                    
                    />


                </label>
                <br/>
                <label>
                    Pizza Size
                    <select id="sizes" name="sizes">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="x-large">Extra-Large</option>
                    </select>
                </label>
                <br/>
                <div>
                    <h2>Choose Toppings</h2>
                <label htmlFor="toppings" className="toppings">
                    pepperoni
                    <input
                    id="toppings"
                    type="checkbox"
                    name="pepperoni"
                    checked="true"
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        sausage
                       <input
                    id="toppings"
                    type="checkbox"
                    name="sausage"
                    checked="true"
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        cheese
                       <input
                    id="toppings"
                    type="checkbox"
                    name="cheese"
                    checked="true"
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        mushroom
                       <input
                    id="toppings"
                    type="checkbox"
                    name="mushroom"
                    checked="true"
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        pineapple
                       <input
                    id="toppings"
                    type="checkbox"
                    name="pineapple"
                    checked="true"
                    
                    />
                </label>
                </div>
                <div>
                    <h2>Special Instructions?</h2>
                <label>
                    <textarea
                    name="instructions"
                    />
                </label>
                </div>
                <button>Order</button>
            </form>
        </div>
    )
}


