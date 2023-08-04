import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface Dropdown {
  selectorOptions: string[];
  onSelectItem: (selectedItem: string) => void;
  clearSelect: boolean;
}

export const CustomDropdown = ({
  selectorOptions,
  onSelectItem,
  clearSelect,
}: Dropdown): JSX.Element => {
  const dropdownRef = useRef<SelectDropdown>(null);

  useEffect((): void => {
    if (clearSelect && dropdownRef.current) {
      dropdownRef.current.reset();
    }
  }, [clearSelect]);

  return (
    <SelectDropdown
      ref={dropdownRef}
      data={selectorOptions}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdownStyle}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
      selectedRowStyle={styles.selectedRowStyle}
      search
      searchInputStyle={styles.searchInputStyle}
      searchPlaceHolder={'Search here'}
      searchPlaceHolderColor={'darkgrey'}
      onSelect={(selectedItem: string): void => {
        onSelectItem(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem: string): string => {
        return selectedItem;
      }}
      rowTextForSelection={(item: string): string => {
        return item;
      }}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonTextStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
  },
  rowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  rowTextStyle: {
    color: '#444',
    textAlign: 'left',
  },
  selectedRowStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  searchInputStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
