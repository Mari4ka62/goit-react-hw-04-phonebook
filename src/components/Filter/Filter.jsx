import PropTypes from 'prop-types';
import css from './Filter.module.css';
export default function Filter({ filterData, onChange }) {
  return (
    <div className={css.filter}>
      <label className={css.filterLabel}>Find contacts by name</label>
      <input
        type="text"
        onChange={onChange}
        name="filter"
        value={filterData}
        className={css.filterInput}
      />
    </div>
  );
}
Filter.propTypes = {
  filterData: PropTypes.string,
  onChange: PropTypes.func,
};
