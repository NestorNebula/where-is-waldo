import PropTypes from 'prop-types';

function Marker({ coordinates, found }) {
  return (
    <>
      {found && (
        <div
          style={{
            position: 'absolute',
            top: `calc(${coordinates.exactY}% - 2.5rem)`,
            left: `calc(${coordinates.exactX}% - 2.5rem)`,
            width: '5rem',
            height: '5rem',
            background: 'radial-gradient(circle, transparent 60%, #4ade80 60%)',
            borderRadius: '100%',
          }}
        ></div>
      )}
    </>
  );
}

export default Marker;

Marker.propTypes = {
  coordinates: PropTypes.object,
  found: PropTypes.bool,
};
