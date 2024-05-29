'use client';

import React, { ReactElement, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

interface SingleSelectDropdownProps {
  title?: string;
  items: string[];
  selection: string;
  onChange: (selection: string) => void;
  className?: string;
}

const SingleSelectDropdown = ({
  title = 'Single Select',
  items,
  selection,
  onChange,
  className,
}: SingleSelectDropdownProps): ReactElement => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const button = buttonRef.current;

    if (!dropdown || !button) return;

    const toggleDropdown = (e: MouseEvent) => {
      e.stopPropagation();
      dropdown.classList.toggle(styles.open);
    };

    const closeDropdown = (e: MouseEvent) => {
      dropdown.classList.remove(styles.open);
    };

    button.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);

    return () => {
      button.removeEventListener('click', toggleDropdown);
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`}>
      <p>{title}</p>
      <div ref={buttonRef} className={styles['input-box']}>
        {selection}
      </div>
      <div className={styles.dropdownContent}>
        {items.map((item) => (
          <div key={item} onClick={() => onChange(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

interface MultiSelectDropdownProps {
  title?: string;
  items: string[];
  selections: string[];
  onChange: (selections: string[]) => void;
  className?: string;
}

const MultiSelectDropdown = ({
  title = 'Multi Select',
  items,
  selections,
  onChange,
  className,
}: MultiSelectDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const button = buttonRef.current;

    if (!dropdown || !button) return;

    const toggleDropdown = (e: MouseEvent) => {
      e.stopPropagation();
      dropdown.classList.toggle(styles.open);
    };

    const closeDropdown = (e: MouseEvent) => {
      if (!dropdown?.contains(e.target as Node)) {
        dropdown.classList.remove(styles.open);
      }
    };

    button.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);

    return () => {
      button.removeEventListener('click', toggleDropdown);
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const handleSelection = (newSelection: string) => {
    const updatedSelections = selections.includes(newSelection)
      ? selections.filter((s) => s !== newSelection)
      : [...selections, newSelection];
    onChange(updatedSelections);
  };

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`}>
      <p>{title}</p>
      <div ref={buttonRef} className={styles['input-box']}>
        {selections?.join(', ') || 'Select an option'}
      </div>
      <div className={styles.dropdownContent}>
        {items.map((item) => (
          // TODO: tint the selected items so it's clear to the user which dropdown options have been selected.
          // To be performant, this may require a solution using the Map class.
          <div key={item} onClick={() => handleSelection(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Seperated into two components to keep them pure
export { SingleSelectDropdown, MultiSelectDropdown };
