import React from 'react';
import cx from 'classnames';

const ghostScans = props => {
  let profileProgressions = props.response.profile.profileProgression.data;

  let manifest = props.manifest;

  let list = [];

  Object.entries(profileProgressions.checklists[2360931290]).forEach(([key, value]) => {
    let hash = parseInt(key, 10);

    let completed = value;

    let checklist = false;
    Object.entries(manifest.DestinyChecklistDefinition[2360931290].entries).forEach(([pear, peach]) => {
      if (manifest.DestinyChecklistDefinition[2360931290].entries[pear].hash === hash) {
        checklist = manifest.DestinyChecklistDefinition[2360931290].entries[pear];
        return;
      }
    });

    let destination = false;
    Object.keys(manifest.DestinyDestinationDefinition).forEach(subKey => {
      if (manifest.DestinyDestinationDefinition[subKey].hash === checklist.destinationHash) {
        destination = manifest.DestinyDestinationDefinition[subKey];
        return;
      }
    });

    let place = false;
    Object.keys(manifest.DestinyPlaceDefinition).forEach(subKey => {
      if (manifest.DestinyPlaceDefinition[subKey].hash === destination.placeHash) {
        place = manifest.DestinyPlaceDefinition[subKey];
        return;
      }
    });

    let scan = false;
    Object.keys(destination.bubbles).forEach(subKey => {
      if (destination.bubbles[subKey].hash === checklist.bubbleHash) {
        scan = destination.bubbles[subKey];
        return;
      }
    });

    let farmScans = [1711258227, 1763506864, 2127236170, 3249685481];

    if (farmScans.includes(checklist.hash)) {
      scan = {
        displayProperties: {
          name: 'The Farm'
        }
      };
    }

    let number = checklist.displayProperties.name.match(/([0-9]+)/)[0];

    list.push(
      <li key={checklist.hash} data-state={completed ? `complete` : `incomplete`} data-sort={number}>
        <div
          className={cx('state', {
            completed: completed
          })}
        />
        <div className='text'>
          <p>Scan {number}</p>
          <p>
            {scan ? scan.displayProperties.name : `???`}, {place.displayProperties.name}
          </p>
        </div>
        <div className='lowlines'>
          <a href={`https://lowlidev.com.au/destiny/maps/${checklist.destinationHash}/${checklist.hash}?origin=BRAYTECH`} target='_blank' rel='noopener noreferrer'>
            <i className='uniE1C4' />
          </a>
        </div>
      </li>
    );
  });

  list.sort(function(a, b) {
    let intA = a.props['data-sort'];
    let intB = b.props['data-sort'];
    return intA - intB;
  });

  return (
    <>
      <div className='head'>
        <h4>Ghost scans</h4>
        <div className='binding'>
          <p>Profile bound</p>
        </div>
        <div className='progress'>
          <div className='title'>Ghost scans performed</div>
          <div className='fraction'>
            {Object.values(profileProgressions.checklists[2360931290]).filter(value => value === true).length}/{Object.keys(profileProgressions.checklists[2360931290]).length}
          </div>
          <div
            className='bar'
            style={{
              width: `${(Object.values(profileProgressions.checklists[2360931290]).filter(value => value === true).length / Object.keys(profileProgressions.checklists[2360931290]).length) * 100}%`
            }}
          />
        </div>
      </div>
      <ul className='list no-interaction'>{list}</ul>
    </>
  );
};

export default ghostScans;
