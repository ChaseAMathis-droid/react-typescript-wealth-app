import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClientOnboardingForm from './ClientOnboardingForm';

describe('ClientOnboardingForm', () => {
  it('shows validation error when required fields are missing on submit', async () => {
    render(<ClientOnboardingForm />);

    // Click the submit button without filling required fields
    const submit = screen.getByRole('button', { name: /create client/i });
    fireEvent.click(submit);

    // Expect the first name required error to appear
    const err = await screen.findByText(/first name is required/i);
    expect(err).toBeTruthy();
  });
});
