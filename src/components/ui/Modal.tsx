'use client';

import { Fragment, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { VisuallyHidden } from './Badge';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  /** Overrides the default `p-6` body wrapper — pass a flex/no-padding
   *  className when the modal content manages its own internal layout
   *  (e.g. a chat window with its own header/scroll area/footer). */
  bodyClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  bodyClassName,
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Fragment>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div
          className={cn(
            'relative w-full bg-nexus-900 border border-border rounded-2xl shadow-nexus-xl overflow-hidden animate-scale-in',
            sizeClasses[size],
            className
          )}
        >
          {(title || showClose) && (
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="font-display text-heading-lg text-nexus-50"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-body-md text-nexus-400"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="text-nexus-400 hover:text-nexus-100"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </Button>
              )}
            </div>
          )}
          <div className={bodyClassName ? cn('flex-1 min-h-0', bodyClassName) : 'flex-1 min-h-0 overflow-y-auto p-6'}>
            {children}
          </div>
        </div>
      </div>
      <VisuallyHidden onKeyDown={handleKeyDown} tabIndex={0} />
    </Fragment>
  );
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-body-md text-nexus-300 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant={variant === 'danger' ? 'primary' : 'primary'}
          onClick={onConfirm}
          loading={loading}
          className={variant === 'danger' ? 'bg-red-500 hover:bg-red-400' : ''}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export function AlertDialog({
  isOpen,
  onClose,
  title,
  message,
  actionText = 'OK',
  onAction,
}: AlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-body-md text-nexus-300 mb-6">{message}</p>
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={() => {
            onAction?.();
            onClose();
          }}
        >
          {actionText}
        </Button>
      </div>
    </Modal>
  );
}