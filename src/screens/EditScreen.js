import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import M from "materialize-css";
import { Link } from 'react-router-dom';

export default function EditScreen(props) {

	// Fields states
	const [name, setName] = useState('');
	const [doc, setDoc] = useState();
	const [date, setDate] = useState('');
	const [email, setEmail] = useState('');
	const [edit, setEdit] = useState(false);
	const [id, setId] = useState('')

	useEffect(() => {
		var elems = document.querySelectorAll('.datepicker');
		if (props.location.search && props.location.search.includes('edit')) {
			setEdit(true)
		}
		const options = {
			autoClose: true,
			format: 'yyyy/mm/dd',
			minyear: 1921,
			maxYear: 2021,
			yearRange: 100
		}
		// eslint-disable-next-line no-unused-vars
		var instances = M.Datepicker.init(elems, options);
		// eslint-disable-next-line no-unused-vars
		var instance = M.Datepicker.getInstance(elems[0]);
		M.Datepicker.getInstance(elems[0]).options.onClose = () => {
			setDate(M.Datepicker.getInstance(elems[0]).date.getFullYear()+'/'+M.Datepicker.getInstance(elems[0]).date.getMonth()+'/'+M.Datepicker.getInstance(elems[0]).date.getDate())
		}
		console.log("-----",instance)
		if (props.location.search) {
			const queries = props.location.search.split('?')[1].split('&')
			setName(queries[0].split('=')[1])
			setDoc(queries[1].split('=')[1])
			setDate(queries[2].split('=')[1])
			setEmail(queries[3].split('=')[1])
			setId(queries[4].split('=')[1])
		}
	}, [edit, props.location.search])



	const handleForm = async (e, mode) => {
		var elems = document.querySelectorAll('.datepicker');
		e.preventDefault()
		// eslint-disable-next-line no-unused-vars
		var instance = M.Datepicker.getInstance(elems[0]);
		setDate(document.getElementById('date').value)
		const date = document.getElementById('date').value
		try {
			if (mode === "create") { // CREATE USER
				const userSaved = await Axios.post(process.env.PUBLIC_URL + '/api/users', { name, doc, email, date })
				if (!userSaved.data.success) {
					M.toast({ html: userSaved.data.message })
				} else {
					props.history.push('/crm')
					M.toast({ html: 'Usuario creado correctamente' })
				}
			} else { // EDIT USER
				const userSaved = await Axios.put(process.env.PUBLIC_URL + '/api/users/', { name, doc, email, date, id })
				if (!userSaved.data.success) {
					M.toast({ html: userSaved.data.message })
				} else {
					props.history.push('/crm')
					M.toast({ html: 'Usuario modificado correctamente' })
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="m-50">
			<div className="row">
				<div className="col s12">
					<div className="card no-shadow">
						<div className="valign-wrapper color-1">
							<div className="col s4 l-0">
								<h4>{edit ? "Modificar" : "Nuevo"} cliente</h4>
							</div>
						</div>
						<div className="card-content">
							<div className="container container-card">
								<form onSubmit={(e, mode) => handleForm(e, edit ? "edit" : "create")}>
									<div className="row">
										<div className="row">
											<div className="input-field col s7">
												<input placeholder="Nombre Completo" id="name" type="text" className=" border" value={name} onChange={(e) => setName(e.target.value)} />
												<label htmlFor="name" className="active label-form bold">Nombre Completo</label>
											</div>
											<div className="input-field  col s4 right">
												<input id="doc" type="number" className=" border" placeholder="Número de documento" value={doc} onChange={(e) => setDoc(e.target.value)} />
												<label htmlFor="doc" className="active label-form bold">Número de documento</label>
											</div>
										</div>

										<div className="row">
											<div className="input-field col s4">
												<input placeholder="yyyy/mm/dd" id="date" type="text" value={date} onChange={(e) => setDate(e.target.value)} className=" datepicker border" />
												<label htmlFor="date" className="active label-form bold">Fecha de nacimiento</label>
											</div>
											<div className="input-field  col s7 right">
												<input id="email" type="email" className=" border" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
												<label htmlFor="email" className="active label-form bold">Email</label>
											</div>
										</div>
										<hr className="hr" />
										<div className="row row-actions">
											<input className="col right btn-flat btn-save cap center" type="submit" value="Guardar" />
											<Link className="col right btn-flat btn-cancel cap center" to="/crm">
												Cancelar
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
