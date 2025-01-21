import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/reducers/jobsSlice';
import { useParams } from 'react-router-dom';
import Job from './Job';

const CompanySearchResults = () => {
  const { company } = useParams();
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (company) {
      dispatch(fetchJobs(company));
    }
  }, [company, dispatch]);

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job posting for: {company}</h1>
          {loading && <p>Caricamento...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
