import 'bootstrap/dist/css/bootstrap.min.css';
import { useResidences } from '../../hooks/useResidences';
import { useUsers } from '../../hooks/useUsers';

const ResidenceItem = ({ street, number }) => {
    return (
        <div className='container px-0 d-flex flex-column align-items-center'>
            <div className="container p-0  rounded-2 shadow-sm">
                <div>
                    <img src="https://placehold.co/1?text=Residence\nImage" alt="" className='w-100' />
                </div>
                <div className='row row-cols-1 p-2 pt-3'>
                    <div className="col fw-bold">
                        <span>{street} {number}</span>
                    </div>
                    <div className="col text-size-14 text-secondary ">
                        <span>Occupied by josh</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ResidenceList = () => {
    const { residences, isLoading: residencesLoading } = useResidences();
    const { users } = useUsers()

    return (
        <div className="container p-md-5 p-3">
            <h2>Available residences</h2>
            <div className="row pt-3 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {residences.map((residence) => (
                    <div key={residence.residence_id} className="col mb-3">
                        <ResidenceItem street={residence.street_name} number={residence.street_number} />
                    </div>
                ))}
                <div className="col mb-3">
                    <ResidenceItem street={'street'} number={'123'} />
                </div>
                <div className="col mb-3">
                    <ResidenceItem street={'street'} number={'123'} />
                </div>
                <div className="col mb-3">
                    <ResidenceItem street={'street'} number={'123'} />
                </div>
            </div>
        </div>
    );
};

export default ResidenceList;