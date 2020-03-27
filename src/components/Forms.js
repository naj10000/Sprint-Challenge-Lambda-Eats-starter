import React, { useState, useEffect } from 'react'
import axios from "axios";
import * as yup from "yup";

export default function Forms() {

    const [formState, setFormState] = useState({
        name: "",
        sizes: "",
        
        pepperoni: "",
        sausage: "",
        cheese: "",
        mushroom: "",
        pineapple: "",
         instructions: ""


    })

    const [errors, setErrors] = useState({
        name: "",
        sizes: "",
        pepperoni: "",
        sausage: "",
        cheese: "",
        mushroom: "",
        pineapple: "",
         instructions: ""


    })

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [post, setPost] = useState([])

    const formSchema = yup.object().shape({
        name: yup.string().min(2, "name too short").required("Need a name"),

        sizes: yup.string().required("choose a pizza size"),
        pepperoni: yup.string(),
        sausage: yup.string(),
        cheese: yup.string(),
        mushroom: yup.string(),
        pineapple: yup.string(),
        instructions: yup.string()

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
        validateChange(e);
        setFormState(newFormData)
    }

    const formSubmit = e => {
        e.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data); // get just the form data from the REST api
            console.log("success", post);
            // reset form if successful
            setFormState({
                name: "",
                sizes: "",
                pepperoni: "",
                sausage: "",
                cheese: "",
                mushroom: "",
                pineapple: "",
                 instructions: ""
            });
          })
          .catch(err => console.log(err.response));
      };

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label htmlFor="name"> Name
                    <input

                    id="name"
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formState.name}
                    onChange={inputChange}
                    
                    
                    />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> :null}

                </label>
                <br/>
                <label>
                    Pizza Size
                    <select id="sizes" name="sizes" onChange={inputChange}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="x-large">Extra-Large</option>
                    </select>
                </label>
                {errors.sizes.length > 0 ? <p className="error">{errors.sizes}</p> :null}
                <br/>
                <div>
                    <h2>Choose Toppings</h2>
                <label htmlFor="toppings" className="toppings">
                    pepperoni
                    <input
                    id="toppings"
                    type="checkbox"
                    name="pepperoni"
                    checked={formState.pepperoni}
                    onChange={inputChange}
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        sausage
                       <input
                    id="toppings"
                    type="checkbox"
                    name="sausage"
                    checked={formState.sausage}
                    onChange={inputChange}
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        cheese
                       <input
                    id="toppings"
                    type="checkbox"
                    name="cheese"
                    checked={formState.cheese}
                    onChange={inputChange}
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        mushroom
                       <input
                    id="toppings"
                    type="checkbox"
                    name="mushroom"
                    checked={formState.mushroom}
                    onChange={inputChange}
                    
                    />
                    </label>
                    <label htmlFor="toppings" className="toppings">
                        pineapple
                       <input
                    id="toppings"
                    type="checkbox"
                    name="pineapple"
                    checked={formState.pineapple}
                    onChange={inputChange}
                    
                    />
                </label>
                </div>
                <div>
                    <h2>Special Instructions?</h2>
                <label>
                    <textarea
                    name="instructions"
                    value={formState.instructions}
                    onChange={inputChange}
                    />
                </label>
                </div>
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button disabled={buttonDisabled}>Order</button>
            </form>
        </div>
    )
}


