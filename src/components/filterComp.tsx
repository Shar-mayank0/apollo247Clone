import React from 'react'

function FilterComponent() {
    return (
        <div className="filters-container">
            <div className="filters-heading">
                <p className="filters-title">Filters</p>
                <button className="clear-filters-btn" aria-label="Button">
                    <span>Clear All</span>
                </button>
            </div>
            <div className="filters-divider"></div>
            <div className="filters-options">
                <a
                    className="doctors-near-me-link"
                    href="/specialties/general-physician-internal-medicine?page=5&amp;sortby=distance"
                >
                    Show Doctors Near Me
                </a>
                <p className="filters-title">Mode of Consult</p>
                <div className="filter-options-group">
                    <label className="checkbox-blue">
                        <input type="checkbox" value="PHYSICAL" checked={false} name="PHYSICAL" />
                        <span className="checkbox-label">Hospital Visit</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="ONLINE" checked={false} name="ONLINE" />
                        <span className="checkbox-label">Online Consult</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                </div>
                <p className="filters-title">Experience (In Years)</p>
                <div className="filter-options-group">
                    <label className="checkbox-blue">
                        <input type="checkbox" value="0-5" name="0-5" />
                        <span className="checkbox-label">0-5</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="6-10" name="6-10" />
                        <span className="checkbox-label">6-10</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="11-16" name="11-16" />
                        <span className="checkbox-label">11-16</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <button className="clear-filters-btn" aria-label="Button">
                        <span>+1 More</span>
                    </button>
                </div>
                <p className="filters-title">Fees (In Rupees)</p>
                <div className="filter-options-group">
                    <label className="checkbox-blue">
                        <input type="checkbox" value="100-500" name="100-500" />
                        <span className="checkbox-label">100-500</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="500-1000" name="500-1000" />
                        <span className="checkbox-label">500-1000</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="1000+" name="1000+" />
                        <span className="checkbox-label">1000+</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                </div>
                <p className="filters-title">Language</p>
                <div className="filter-options-group">
                    <label className="checkbox-blue">
                        <input type="checkbox" value="English" name="English" />
                        <span className="checkbox-label">English</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="Hindi" name="Hindi" />
                        <span className="checkbox-label">Hindi</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="Telugu" name="Telugu" />
                        <span className="checkbox-label">Telugu</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <button className="clear-filters-btn" aria-label="Button">
                        <span>+10 More</span>
                    </button>
                </div>
                <p className="filters-title">Facility</p>
                <div className="filter-options-group">
                    <label className="checkbox-blue">
                        <input type="checkbox" value="Apollo Hospital" name="Apollo Hospital" />
                        <span className="checkbox-label">Apollo Hospital</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                    <label className="checkbox-blue">
                        <input type="checkbox" value="Other Clinics" name="Other Clinics" />
                        <span className="checkbox-label">Other Clinics</span>
                        <span className="checkbox-checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent
