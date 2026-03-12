import { useState, useEffect } from 'react';
import './Whatsappbutton.css';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const whatsappNumber = '919420409902';
  const whatsappMessage = 'Hi! I\'m interested in learning more about Stronger Every Decade.';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {isVisible && (
        <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className={`whatsapp-button ${isHovered ? 'whatsapp-button--hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title="Chat with us on WhatsApp"
          aria-label="Open WhatsApp chat"
        >
          {/* Official WhatsApp Logo SVG */}
          <svg
            className="whatsapp-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.579 0-3.051.46-4.313 1.33l-.31.177-.318-.052c-1.07-.175-2.098-.481-3.067-.98l.532.91-.061.314c-.315 1.598.071 3.222 1.084 4.559.335.45.77.86 1.285 1.207-.155.447-.392.889-.715 1.305-.125.149-.237.277-.337.383l-.05.056c-.308.359-.618.722-.896 1.084.405.093.812.155 1.222.181 1.627.09 3.17-.694 4.035-2.066.382.056.77.084 1.163.084 3.898 0 7.065-3.17 7.065-7.073S16.35 6.979 12.451 6.979z"/>
          </svg>
          
          {/* Message Bubble */}
          <span className="whatsapp-bubble">
            <span className="whatsapp-bubble__text">Chat with us</span>
            <span className="whatsapp-bubble__arrow"></span>
          </span>
        </a>
      )}
    </>
  );
}