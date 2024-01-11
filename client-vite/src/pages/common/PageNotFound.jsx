// import { faArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchBar = ({ data }) => {
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
    color: '#9F9F9F', // Set your desired custom gray color
  };

  return (
    <div className="container bg-light rounded-5 m-0 py-3 ">
      <input
        type="text"
        className="form-control custom-input-text p-3 border-0 rounded-5"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />

      {query && (
        <div className="row">
          {filteredData.length > 0 ? (
            <div className="col-12 my-3">
              <span className='px-2 fw-bold'>Found pages</span>
            </div>
          ) : (
            <div className="col-12 my-3">
              <span className='px-2 fw-bold'>No pages found</span>
            </div>
          )}
          {filteredData.map((item, index) => (
            <a href={item.link} className='text-decoration-none'>
              <div key={index} className="col-12 px-2">
                <div className="row my-0 custom-gray-hover parent-hover rounded-4">
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
      )}
    </div>
  );
};


const PageNotFound = () => {
  const location = useLocation();

  const data = [
    {
      title: '/admin-page',
      description: 'description',
      link: '/admin-page'
    },
    {
      title: '/user-page',
      description: 'description',
      link: '/user-page'
    },
    {
      title: '/employee-page',
      description: 'description of the page',
      link: '/employee-page'
    },
    {
      title: '/user-page',
      description: 'description',
      link: '/user-page'
    },
  ];

  return (
    <div className="h-90-vh d-flex flex-column justify-content-center align-items-center">
      <div className='text-center'>
        <h1 className="my-0 py-0 display-1 fw-bold">404</h1>
        <h2 className="my-0 py-0 text-muted">page not found</h2>
      </div>
      <div className='text-center mt-4'>
        <p className=''>
          The requested URL
          <mark className='p-1 mx-1'>{location.pathname}</mark>
          was not found on this server.
        </p>
      </div>
      <SearchBar data={data} />
    </div>

  )
}

export default PageNotFound;