import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ObservedImage from '../../components/ObservedImage';
import * as ls from '../../utils/localStorage';

import Records from '../../components/Records';
import { withNamespaces } from 'react-i18next';

class SealNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: ls.get('setting.hideCompletedRecords') ? ls.get('setting.hideCompletedRecords') : false
    };

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  toggleCompleted = () => {
    let currentSetting = ls.get('setting.hideCompletedRecords') ? ls.get('setting.hideCompletedRecords') : false;

    ls.set('setting.hideCompletedRecords', currentSetting ? false : true);

    this.setState({
      hideCompleted: ls.get('setting.hideCompletedRecords')
    });
  };

  render() {
    const {t} = this.props;
    const manifest = this.props.manifest;

    const profileRecords = this.props.response.profile.profileRecords.data.records;

    const sealBars = {
      2588182977: {
        text: 'Wayfarer',
        nodeHash: 2588182977,
        recordHash: 2757681677,
        total: profileRecords[2757681677].objectives[0].completionValue,
        completed: profileRecords[2757681677].objectives[0].progress
      },
      3481101973: {
        text: 'Dredgen',
        nodeHash: 3481101973,
        recordHash: 3798931976,
        total: profileRecords[3798931976].objectives[0].completionValue,
        completed: profileRecords[3798931976].objectives[0].progress
      },
      147928983: {
        text: 'Unbroken',
        nodeHash: 147928983,
        recordHash: 3369119720,
        total: profileRecords[3369119720].objectives[0].completionValue,
        completed: profileRecords[3369119720].objectives[0].progress
      },
      2693736750: {
        text: 'Chronicler',
        nodeHash: 2693736750,
        recordHash: 1754983323,
        total: profileRecords[1754983323].objectives[0].completionValue,
        completed: profileRecords[1754983323].objectives[0].progress
      },
      2516503814: {
        text: 'Cursebreaker',
        nodeHash: 2516503814,
        recordHash: 1693645129,
        total: profileRecords[1693645129].objectives[0].completionValue,
        completed: profileRecords[1693645129].objectives[0].progress
      },
      1162218545: {
        text: 'Rivensbane',
        nodeHash: 1162218545,
        recordHash: 2182090828,
        total: profileRecords[2182090828].objectives[0].completionValue,
        completed: profileRecords[2182090828].objectives[0].progress
      },
      2039028930: {
        text: 'Blacksmith',
        nodeHash: 2039028930,
        recordHash: 2053985130,
        total: profileRecords[2053985130].objectives[0].completionValue,
        completed: profileRecords[2053985130].objectives[0].progress
      }
    };

    let sealDefinition = manifest.DestinyPresentationNodeDefinition[this.props.match.params.secondary];
    let tertiaryHash = this.props.match.params.secondary;

    return (
      <div className='node seal'>
        <div className='children'>
          <div className='icon'>
            <div className='corners t' />
            <ObservedImage className={cx('image')} src={`https://www.bungie.net${sealDefinition.displayProperties.icon}`} />
            <div className='corners b' />
          </div>
          <div className='text'>
            <div className='name'>{sealDefinition.displayProperties.name}</div>
            <div className='description'>{sealDefinition.displayProperties.description}</div>
          </div>
          <div className='until'>
            <h4>{t('Seal progress')}</h4>
            <div className='progress'>
              <div className='title'>{sealBars[sealDefinition.hash].text}</div>
              <div className='fraction'>
                {sealBars[sealDefinition.hash].completed}/{sealBars[sealDefinition.hash].total}
              </div>
              <div
                className='bar'
                style={{
                  width: `${(sealBars[sealDefinition.hash].completed / sealBars[sealDefinition.hash].total) * 100}%`,
                  backgroundColor: sealBars[sealDefinition.hash].color ? sealBars[sealDefinition.hash].color : ``
                }}
              />
            </div>
          </div>
        </div>
        <div className='records'>
          <ul className='list no-interaction tertiary record-items'>
            <Records {...this.props} {...this.state} node={tertiaryHash} />
          </ul>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(SealNode);
