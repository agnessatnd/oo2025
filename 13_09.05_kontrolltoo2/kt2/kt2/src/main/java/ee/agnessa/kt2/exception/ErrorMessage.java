package ee.agnessa.kt2.exception;

import lombok.Data;
import java.util.Date;
@Data // tema sees on @Getter, @Setter, @NoArgsConstructor

public class ErrorMessage {
    private String message;
    private Date timestamp;
    private int status;
}
