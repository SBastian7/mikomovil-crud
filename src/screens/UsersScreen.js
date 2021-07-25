import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import M from "materialize-css";
import Axios from 'axios';
//import dbConnect from '../../lib/dbConnect';
//import User from '../../models/userModel';


export default function UsersScreen(props) {

	// Users state
	const [users, setUsers] = useState([])
	
	useEffect(() => {
		M.AutoInit();
		getUsers()
	}, [])

	// Fx for cast dates to txt
	const month_txt = (month) => {
		switch (month) {
			case 0:
				return 'Enero';
			case 1:
				return 'Febrero';
			case 2:
				return 'Marzo';
			case 3:
				return 'Abril';
			case 4:
				return 'Mayo';
			case 5:
				return 'Junio';
			case 6:
				return 'Julio';
			case 7:
				return 'Agosto';
			case 8:
				return 'Septiembre';
			case 9:
				return 'Octubre';
			case 10:
				return 'Noviembre';
			case 11:
				return 'Diciembre';
			default:
				return ''
		}
	}
	const convertDate = (date) => {
		const D = new Date(date)
		return D.getDate() + " " + month_txt(D.getMonth()) + " " + D.getFullYear()
	}

	// Fx for delete user
	const logicDelete = async (userId) => {
		try {
			const deletedUser = await Axios.put(process.env.PUBLIC_URL+'/api/users/',{id:userId})
			if(!deletedUser.data.success){
				M.toast({ html: 'Error eliminando usuario' })
			}else{
				M.toast({ html: 'Usuario eliminado correctamente' })
				await getUsers()
			}
		} catch (error) {
			M.toast({ html: error })
		}
	}

	const doSearch = async (query) => {
		const result = await Axios.get(process.env.PUBLIC_URL+'/api/users?query='+query)
		setUsers(result.data)
	}

	const getUsers = async () => {
			const result = await Axios.get(process.env.PUBLIC_URL+'/api/users/')
			setUsers(result.data)
		
	}

	// const getUser = async (userId) => {
	// 	try {
	// 		const userFound = await Axios.get(process.env.PUBLIC_URL + '/api/users?query='+userId,)
	// 		return userFound
	// 	} catch (error) {
	// 		return {}
	// 	}
	// }

	return (

		<div className="m-50">
			<div className="row">
				<div className="col s12">
					<div className="card no-shadow">
						<div className="valign-wrapper color-1">
							<div className="col s4 l-0">
								<h4>Clientes</h4>
							</div>
							<div className="col s8 mr-0">
								<div className="col right">
									<Link to="/crm/new_client" className="btn btn-cliente">
										<div className="row">
											<span className="material-icons col m2">
												add
											</span> <div className="btn2">Nuevo cliente</div>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="card-content2">
							<div className="row m-10">
								<div className="col s12 border-tabs">
									<ul className="tabs">
										<li className="tab col s2 m-l ">
											<a href="#test1" className="grey-text text-darken-3 cap">
												Prospectos
											</a>
										</li>
										<li className="tab col s2">
											<a href="#test2" className="active cap">
												Clientes
											</a>
										</li>
										<li className="tab col s2">
											<a href="#test3" className="grey-text text-darken-3 cap">
												Gráficos
											</a>
										</li>
									</ul>
								</div>
								<div id="test1" className="col s12">
									<div className="container">
										<br />
										<div className="row">
											<div className="col s12 center">
												Sección prospectos
											</div>
										</div>
									</div>
								</div>
								<div id="test2" className="col s12">
									{/* Users list */}
									<div className="row">
										<div className="col s10 offset-s1 valign-wrapper search-box">
											<div className="col">
												<span className="material-icons-outlined search-icon">
													search
												</span>
											</div>
											<div className="row">
												<div className="input-field2 col">
													<form>
														<input placeholder="Buscar..." id="first_name" type="text" className=" search-validate" onChange={(e) => doSearch(e.target.value)} />
													</form>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col b s10 offset-s1 p-0">
											<ul className="collection">

												{users.data &&
													users.data.map((user, index) => (
														!user.deleted && <li className="collection-item" key={user._id}>
															<div className="row row-btns">
																<div className="col ml-10">
																	<img src={index % 2 === 0 ? "userf.png" : "userm.png"} alt="CRM user" className="user-icon" />
																</div>
																<div className="col name-field">
																	<div className="bold">
																		{user.name}
																	</div>
																	<div className="">
																		{user.email}
																	</div>
																</div>
																<div className="col right date-field">
																	<div className="grey-text text-darken-2 right">
																		{convertDate(user.date)} | {convertDate(user.createdAt)}
																	</div>
																	<br />
																	<div className="row edit-btns" >
																		<div className="col right">
																			<div className="btn card-action-x" onClick={() => logicDelete(String(user._id))}>
																				<span className="material-icons card-actions">
																					delete
																				</span>
																			</div>
																		</div>
																		<div className="col right">
																			<Link to={`/crm/new_client?name=${user.name}&doc=${user.doc}&birth=${convertDate(user.date)}&email=${user.email}&id=${user._id}&edit`} className="btn card-action-e">
																				<span className="material-icons card-actions">
																					edit
																				</span>
																			</Link>
																		</div>
																	</div>
																</div>
															</div>
														</li>
													))
												}
											</ul>
										</div>
									</div>
								</div>
								<div id="test3" className="col s12">
									<div className="container">
										<br />
										<div className="row">
											<div className="col s12 center">
												Sección gráficos
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
