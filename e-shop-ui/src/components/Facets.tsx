import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import 'css/Facets.css'

export const Facets = (props) => {
  return (
    <div className='facet-container'>
      {Object.entries(props.filters).map(([key, values]) => {
        return (
          <div key={key}>
            <Accordion
              defaultExpanded={true}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography className="facet-key">{key.toUpperCase()}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  {Object.entries(values).map(([filterValue, filterValueEntry]) => {
                    return (
                      <FormControlLabel
                        className="facet-value-item"
                        key={filterValue}
                        control={
                          <Checkbox
                            checked={filterValueEntry.enabled}
                            onChange={(event) => props.onFacetsChange(key, event)}
                            name={filterValue}
                            color="primary"
                          />
                        }
                        label={`${filterValue} (${filterValueEntry.count})`}
                      />
                    )
                  })}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        )
      })}
    </div>
  );
};
