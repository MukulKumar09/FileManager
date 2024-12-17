import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import DefaultButton from '../../../Common/DefaultButton/DefaultButton';
import {useState} from 'react';
import realmOpen from '../../../Services/realm/realmOpen';

export default function Sort({onRequestClose}) {
  const dispatch = useDispatch();
  const state = {
    conf: useSelector(state => state.conf),
  };

  async function updateSort() {
    const payload = {...state.conf, sort: {type, sort}};
    const realm = await realmOpen();
    realm.write(() => {
      realm.create('conf', payload, 'modified');
    });
    dispatch({
      type: 'SETCONF',
      payload,
    });
    onRequestClose();
  }

  const [type, setType] = useState(state.conf.sort.type);
  const [sort, setSort] = useState(state.conf.sort.sort);
  return (
    <View style={[styles.bigGap]}>
      <Text style={[styles.text]}>Type</Text>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton
          label="Name"
          isHighlighted={type == 'name' && true}
          onPress={() => setType('name')}
        />
        <DefaultButton
          label="Size"
          isHighlighted={type == 'size' && true}
          onPress={() => setType('size')}
        />
      </View>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton
          label="Extension"
          isHighlighted={type == 'extension' && true}
          onPress={() => setType('extension')}
        />
        <DefaultButton
          label="Date"
          isHighlighted={type == 'date' && true}
          onPress={() => setType('date')}
        />
      </View>
      <View style={[styles.divider]} />
      <Text style={[styles.text]}>Sort</Text>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton
          label="Ascending"
          isHighlighted={sort == 'ascending' && true}
          onPress={() => setSort('ascending')}
        />
        <DefaultButton
          label="Descending"
          isHighlighted={sort == 'descending' && true}
          onPress={() => setSort('descending')}
        />
      </View>
      <View style={[styles.divider]} />
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton label="Cancel" onPress={onRequestClose} />
        <DefaultButton
          label="Sort"
          isHighlighted={true}
          onPress={() => updateSort()}
        />
      </View>
    </View>
  );
}
