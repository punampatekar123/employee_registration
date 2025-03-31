import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack, Text, PrimaryButton, DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react';
import { IEmployee } from '../types';
import { Users as UsersIcon } from 'lucide-react';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as IEmployee;

  if (!formData) {
    navigate('/');
    return null;
  }

  const columns: IColumn[] = [
    { key: 'field', name: 'Field', fieldName: 'field', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'value', name: 'Value', fieldName: 'value', minWidth: 200, maxWidth: 400, isMultiline: true },
  ];

  const items = [
    { key: '1', field: 'Full Name (Emp No)', value: `${formData.firstName} ${formData.lastName} (${formData.employeeNumber})` },
    { key: '2', field: 'Department', value: formData.department },
    { key: '3', field: 'Business Justification', value: formData.businessJustification },
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="bg-[#002850] text-white p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded">
            <UsersIcon size={30} color="white" fill="white" strokeWidth={0} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Employee Registration Form</h1>
            <p className="text-sm text-white/80">Fill in the form and register for upcoming event</p>
          </div>
        </div>
      </div>

      <div className="p-6 w-full flex flex-col items-center">
        <div className="text-center">
          <h4 className="text-xl font-semibold">Thank you for your registration!</h4>
        </div>
        <Stack tokens={{ childrenGap: 20 }} className="w-full max-w-2xl">
          <DetailsList
            items={items}
            columns={columns}
            selectionMode={0}
            layoutMode={DetailsListLayoutMode.justified}
            styles={{
              root: {
                marginTop: 20,
              },
            }}
          />
          <div className="flex justify-center mt-4">
            <PrimaryButton
              text="Back to Registration"
              onClick={() => navigate('/')}
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
            />
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Confirmation;
