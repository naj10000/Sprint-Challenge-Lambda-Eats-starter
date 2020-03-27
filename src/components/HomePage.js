import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <Link to="/pizza">
            <button>Pizza?</button>
            </Link>
            
        </div>
    )
}
