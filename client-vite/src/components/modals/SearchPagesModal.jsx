import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "antd"
import { useState } from "react";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";


const SearchPagesModal = ({ showModal, handleCancel, data }) => {
	const [query, setQuery] = useState('');

	const handleInputChange = (event) => {
		setQuery(event.target.value.toLowerCase());
	};

	const filteredData = data.filter((item) => {
		const { title, description } = item;
		return (
			title.toLowerCase().includes(query) || description.toLowerCase().includes(query)
		);
	});

	const customGrayStyle = {
		color: '#9F9F9F',
	};

	const customBackgroundColor = '#ebecf0'; // Replace with your desired custom background color

	return (
		<Modal wrapClassName="p-0" centered open={showModal} onCancel={handleCancel} closable={false} footer={''}>
			<div className="container rounded-5 p-0 ">

				<div className="input-group rounded-5" style={{ backgroundColor: customBackgroundColor }}>
					<span className="input-group-text border-0 rounded-5 px-3" style={{ backgroundColor: customBackgroundColor }}>
						<FontAwesomeIcon icon={faSearch} />
					</span>
					<input type="text" className="form-control py-3 px-1 border-0 rounded-5" placeholder="Search..." value={query} onChange={handleInputChange} style={{ backgroundColor: customBackgroundColor, boxShadow: "none" }} />
					{query && (
						<span onClick={() => setQuery('')} className="input-group-text border-0 rounded-5 px-3 cursor-pointer" style={{ backgroundColor: customBackgroundColor }}>
							<FontAwesomeIcon className="text-secondary" icon={faX} width={'10px'} />
						</span>
					)}
				</div>
				<div className="row">
					{filteredData.length > 0 ? (
						<div className="col-12 my-3">
							<span className='px-2 fw-bold'>Suggested pages</span>
						</div>
					) : (
						<div className="col-12 my-3">
							<span className='px-2 fw-bold'>No pages found</span>
						</div>
					)}
					{filteredData.map((item, index) => (
						<a key={index} href={item.path} className='text-decoration-none'>
							<div key={index} className="col-12 px-2">
								<div className="row my-0 custom-gray-hover parent-hover rounded-3">
									<div className="col p-2">
										{item.title.toLowerCase().includes(query) ? (
											<>
												<span className='text-size-14' style={customGrayStyle}>
													{item.title.substring(0, item.title.toLowerCase().indexOf(query))}
												</span>
												<span className="text-size-14 fw-bold text-black">
													{item.title.substring(
														item.title.toLowerCase().indexOf(query),
														item.title.toLowerCase().indexOf(query) + query.length
													)}
												</span>
												<span className='text-size-14' style={customGrayStyle}>
													{item.title.substring(item.title.toLowerCase().indexOf(query) + query.length)}
												</span>
												<span className='text-size-14' style={customGrayStyle}>{` • `}{item.path}</span>
											</>
										) : (
											<span style={customGrayStyle}>{item.title}</span>
										)}
										<div className="text-size-12 mt-1">
											{item.description.toLowerCase().includes(query) ? (
												<>
													<span className='text-size-14' style={customGrayStyle}>
														{item.description.substring(0, item.description.toLowerCase().indexOf(query))}
													</span>
													<span className="text-size-14 fw-bold text-black">
														{item.description.substring(
															item.description.toLowerCase().indexOf(query),
															item.description.toLowerCase().indexOf(query) + query.length
														)}
													</span>
													<span className='text-size-14' style={customGrayStyle}>
														{item.description.substring(item.description.toLowerCase().indexOf(query) + query.length)}
													</span>
												</>
											) : (
												<span style={customGrayStyle}>{item.description}</span>
											)}
										</div>
									</div>
									<div className="col-auto d-flex flex-column justify-content-center align-items-center">
										<svg className='display-child-on-hover' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
											<path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
										</svg>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</Modal>

	);
};

export default SearchPagesModal;