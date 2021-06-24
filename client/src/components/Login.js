import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const history = useHistory()


    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return (
    <>
    <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
                Login
            </Button>
            <div className="w-100 text-left">
                <Link to="/recover-password">Recover password</Link>
            </div>
        </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Don't have an account?
        <div className="w-100 text-left">
            <Link to="/signup">Create an account</Link>
        </div>
    </div>
    </>
    )
}