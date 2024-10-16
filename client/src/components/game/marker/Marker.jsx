import PropTypes from 'prop-types';

function Marker({ coordinates }) {
  return <>{coordinates && <div></div>}</>;
}

export default Marker;

Marker.propTypes = {
  coordinates: PropTypes.object,
};
