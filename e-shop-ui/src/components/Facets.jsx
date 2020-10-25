import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import 'css/Facets.css'


const FILTER_KEYS = ['manufacturer', 'condition', 'productAspectRatio']

export class Facets extends React.Component {
  // filters
  // data
  // onFacetsChange

  getFilterableValuesByKeys = (lists) => {
    if (!lists.length) {
      return
    }

    const filterableValuesByKeys = {}

    FILTER_KEYS.forEach(filterKey => {
      filterableValuesByKeys[filterKey] = [...new Set(lists.map(item => item[filterKey]).filter(i => i))]
    })

    return filterableValuesByKeys
  } 

  render () {
    return (
      <div className='facet-container'>
        {/* <Accordion> */}
          {Object.entries(this.props.filters).map(([key, values]) => {
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
                                onChange={(event) => this.props.onFacetsChange(key, event)}
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
    )
  }
}