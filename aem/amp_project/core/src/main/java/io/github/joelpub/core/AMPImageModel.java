package io.github.joelpub.core;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AMPImageModel {


    @Inject
    private String headingText;

    @Inject
    private String description;

    @PostConstruct
    private void init(){

    }

    public String getHeadingText() {
        return headingText;
    }

    public String getDescription() {
        return description;
    }
}
