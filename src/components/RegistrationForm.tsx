import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  PrimaryButton,
  Dropdown,
  IDropdownOption,
  MessageBar,
  MessageBarType,
  Stack,
  mergeStyles,
} from '@fluentui/react';
import { Users as UsersIcon } from 'lucide-react';

import { IEmployee } from '../types';

const textFieldClass = mergeStyles({ width: '100%' });

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<IDropdownOption[]>([]);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<IEmployee>({
    firstName: '',
    lastName: '',
    employeeNumber: '',
    department: '',
    businessJustification: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://8e72f048a1dc438998718e1ee90f2960.api.mockbin.io/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: string[] = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format');
        }

        const options = data.map((dept, index) => ({
          key: index.toString(),
          text: dept,
        }));

        setDepartments(options);
      } catch (err) {
        setError('Failed to load departments. Please try again later.');
        console.error('Error fetching departments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.department || !formData.businessJustification) {
      setError('All fields are required');
      return false;
    }

    if (formData.employeeNumber.length !== 6 || !/^[0-9]{6}$/.test(formData.employeeNumber)) {
      setError('Employee number must be exactly 6 digits');
      return false;
    }

    if (formData.businessJustification.length > 255) {
      setError('Business justification cannot exceed 255 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (validateForm()) {
      navigate('/confirmation', { state: formData });
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="bg-[#002850] text-white p-6 flex items-center gap-4">
        <div className="p-2 bg-white/10 rounded">
        
          <UsersIcon size={30} color="white" fill="white" strokeWidth={0} />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Employee Registration Form</h1>
          <p className="text-sm text-white/80">Fill in the form and register for upcoming event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <Stack tokens={{ childrenGap: 20 }}>
          {error && (
            <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
          )}

          <TextField
            label="First name"
            required
            value={formData.firstName}
            onChange={(_, value) => setFormData({ ...formData, firstName: value || '' })}
            className={textFieldClass}
          />

          <TextField
            label="Last name"
            required
            value={formData.lastName}
            onChange={(_, value) => setFormData({ ...formData, lastName: value || '' })}
            className={textFieldClass}
          />

          <TextField
            label="Employee number"
            required
            value={formData.employeeNumber}
            onChange={(_, value) => setFormData({ ...formData, employeeNumber: value || '' })}
            description="Must be exactly 6 digits"
            className={textFieldClass}
          />

          <Dropdown
            label="Department"
            required
            options={departments}
            selectedKey={departments.find(d => d.text === formData.department)?.key}
            onChange={(_, option) => setFormData({ ...formData, department: option?.text || '' })}
            className={textFieldClass}
            placeholder={isLoading ? "Loading departments..." : "Select a department"}
            disabled={isLoading}
          />

          <TextField
            label="Business justification"
            required
            multiline
            rows={4}
            value={formData.businessJustification}
            onChange={(_, value) => setFormData({ ...formData, businessJustification: value || '' })}
            description={`${formData.businessJustification.length}/255 characters`}
            className={textFieldClass}
          />

          <div className="flex justify-center mt-4">
            <PrimaryButton
              type="submit"
              text="Submit"
              styles={{
                root: {
                  backgroundColor: '#0078d4',
                  borderRadius: '2px',
                  padding: '20px 32px',
                  height: 'auto',
                },
                label: {
                  fontSize: '14px',
                  fontWeight: '600',
                }
              }}
              disabled={isLoading}
            />
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default RegistrationForm;
