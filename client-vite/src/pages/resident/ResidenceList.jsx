import 'bootstrap/dist/css/bootstrap.min.css';
import { useResidences } from '../../hooks/useResidences';
import { useUsers } from '../../hooks/useUsers';

const ResidenceItem = ({ street, number }) => {
    return (
        <div className='container d-flex flex-column align-items-center'>
            <div className="container p-0  rounded-2 shadow-sm">
                <div>
                    <img src="https://placehold.co/325x325?text=Residence\nImage" alt="" className='w-100' />
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
        <div className="row">
            {residences.map((residence) => (
                <div key={residence.residence_id} className="col-3">
                    <ResidenceItem street={residence.street_name} number={residence.street_number}/>
                </div>
            ))}
        </div>
    );
};

export default ResidenceList;