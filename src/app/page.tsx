'use client';

import styles from './page.module.css';
import { MultiSelectDropdown, SingleSelectDropdown } from './Dropdown';
import { useState } from 'react';

export default function Home() {
  const [dropdownSelection, setDropdownSelection] = useState('Hello');
  const [dropdownSelections, setDropdownSelections] = useState(['Hello']);
  const items = ['Hello', 'Goodbye', 'Good Morning', 'Good Night'];

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>Hive AI FE Take Home Prompt</h2>
        <p>By Sean Pine</p>

        <div style={{ display: 'flex', gap: '25px' }}>
          <SingleSelectDropdown
            items={items}
            selection={dropdownSelection}
            onChange={(selection) => setDropdownSelection(selection)}
          />
          <MultiSelectDropdown
            items={items}
            selections={dropdownSelections}
            onChange={(selections) => setDropdownSelections(selections)}
          />
        </div>

        <p style={{ marginTop: '250px' }}>Thank you!</p>
      </div>
    </main>
  );
}
