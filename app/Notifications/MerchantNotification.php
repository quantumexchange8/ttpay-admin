<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MerchantNotification extends Notification
{
    use Queueable;

    protected $name;
    protected $role_id;
    protected $password;

    public function __construct($name, $password, $role_id)
    {
        $this->name = $name;
        $this->role_id = $role_id;
        $this->password = $password;

        // dd($this->name, $this->role_id, $this->password);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('TT-Pay - New Merchant Created')
            ->greeting('Dear ' . $this->name)
            ->line('Please find the credentials below to login on TT-Pay Merchant.')
            ->line('Login: ' . $this->role_id)
            ->line('Password: ' . $this->password)
            ->line('Thank you for using our application!')
            ->salutation('Best regards, TT-Pay');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
